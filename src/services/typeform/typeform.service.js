const { typeFormBearerToken } = require("@config/vars");
const axiosUtil = require("@utils/axios");
const {
  storeTypeFormWorkspace,
  storeTypeFormFormData,
  storeTypeFormAllForms,
  storeTypeFormFormByWorkspace,
  storeTypeFormFromResponse,
} = require("@utils/dbhelper");

/**
 * Typeform Service
 *
 */
const typeformApiBaseUrl = "https://api.typeform.com";
const workspaces = [];
const forms = [];
const formDetails = [];
const formResponses = [];

const axiosInstance = axiosUtil(typeformApiBaseUrl, typeFormBearerToken);

const typeformService = async () => {
  try {
    await Promise.all([fetchAllWorkspaces(), fetchAllForms()]);
    await processFormsByWorkspace();
    await Promise.all([processFormData(), processFormResponses()]);
    
    const uniqueResponses = removeDuplicateResponses();
    await Promise.all([
      saveWorkspacesToDB(),
      saveFormsToDB(),
      saveFormDetailsToDB(),
      saveFormDataToDB(),
      saveFormResponsesToDB(uniqueResponses),
    ]);
    
    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const fetchDataWithPagination = async (endpoint, processFunction) => {
  let hasNextPage = true;
  let page = 1;
  while (hasNextPage) {
    const response = await axiosInstance.get(`${endpoint}?page=${page}`);
    const pageCount = response.data.page_count || 0;

    if (response.data.items) {
      processFunction(response.data.items);
    }

    page += 1;
    hasNextPage = page <= pageCount;
  }
};

const fetchAllWorkspaces = async () => {
  await fetchDataWithPagination('/workspaces', (items) => {
    workspaces.push(...items);
  });
};

const fetchAllForms = async () => {
  await fetchDataWithPagination('/forms', (items) => {
    forms.push(...items);
  });
};

const processFormsByWorkspace = async () => {
  for (const workspace of workspaces) {
    await fetchDataWithPagination(`/forms?workspace_id=${workspace.id}`, (items) => {
      const formsByWorkspace = items.map((form) => ({ ...form, workspaceId: workspace.id }));
      formDetails.push(...formsByWorkspace);
    });
  }
};

const processFormData = async () => {
  console.log(`${formDetails.length} forms found for data extraction.`);
  for (const form of formDetails) {
    await fetchFormData(form);
  }
};

const processFormResponses = async () => {
  for (const form of formDetails) {
    await fetchFormResponses(form);
  }
};

const fetchFormData = async (form) => {
  const response = await axiosInstance.get(`/forms/${form.id}`);
  if (response.data) {
    const formData = { ...response.data, workspaceId: form.workspaceId };
    formDetails.push(formData);
  }
};

const fetchFormResponses = async (form) => {
  await fetchDataWithPagination(`/forms/${form.id}/responses`, (items) => {
    const responses = items.map((response) => ({
      ...response,
      workspaceId: form.workspaceId,
      formId: form.id,
    }));
    formResponses.push(...responses);
  });
};

const saveWorkspacesToDB = async () => {
  const workspaceSaveTasks = workspaces.map((workspace) =>
    storeTypeFormWorkspace(workspace.id, workspace)
  );
  await Promise.all(workspaceSaveTasks);
};

const saveFormsToDB = async () => {
  const formSaveTasks = forms.map((form) =>
    storeTypeFormAllForms(form.id, form.created_at, form)
  );
  await Promise.all(formSaveTasks);
};

const saveFormDetailsToDB = async () => {
  const formDetailSaveTasks = formDetails.map((formData) =>
    storeTypeFormFormByWorkspace(formData.workspaceId, formData.id, formData)
  );
  await Promise.all(formDetailSaveTasks);
};

const saveFormDataToDB = async () => {
  const formDataSaveTasks = formDetails.map((formData) =>
    storeTypeFormFormData(formData.id, formData.workspaceId, formData)
  );
  await Promise.all(formDataSaveTasks);
};

const saveFormResponsesToDB = async (uniqueResponses) => {
  const responseSaveTasks = uniqueResponses.map((response) =>
    storeTypeFormFromResponse(response.formId, response.landing_id, response)
  );
  await Promise.all(responseSaveTasks);
};

const removeDuplicateResponses = () => {
  const uniqueLandingIds = new Set();
  return formResponses.filter((response) => {
    const { landing_id } = response;
    if (!uniqueLandingIds.has(landing_id)) {
      uniqueLandingIds.add(landing_id);
      return true;
    }
    return false;
  });
};

module.exports = typeformService;
