const { teamsAppURI } = require("@config/vars");
const axiosUtil = require("@utils/axios");
const { storeTeamsAppWorkspaceData, storeTeamsAppCalenderEvents } = require("@utils/dbhelper");

/**
 * DataMigration Service
 *
 */
const dataMigrationService = async () => {
  try {
    const [workspaces, calenderEvents] = await Promise.all([getWorkspaces(), getCalenderEvents()]);
    await Promise.all([
      handleStoringWorkspaceData(workspaces),
      handleStoringCalenderEventsData(calenderEvents),
    ]);
    return true;
  } catch (error) {
    throw error;
  }
};

const getWorkspaces = async () => {
  const axiosInstance = axiosUtil(teamsAppURI);
  const workspaces = await axiosInstance.get("/shared-resource/workspaces");
  return workspaces.data;
};

const getCalenderEvents = async () => {
  const axiosInstance = axiosUtil(teamsAppURI);
  const events = await axiosInstance.get("/shared-resource/calender-events");
  return events.data;
};

const handleStoringWorkspaceData = async (workspaces = []) => {
  const promises = workspaces.map((workspace) => {
    return storeTeamsAppWorkspaceData(workspace._id, workspace);
  });
  await Promise.all(promises);
  return true;
};

const handleStoringCalenderEventsData = async (events = []) => {
  const promises = events.map((event) => {
    return storeTeamsAppCalenderEvents(event.workspace, event._id, event);
  });
  await Promise.all(promises);
  return true;
};

module.exports = { dataMigrationService };
