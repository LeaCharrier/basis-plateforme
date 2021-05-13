export const figmaApi = {
    teamProjects: (teamId) => `https://api.figma.com/v1/teams/${teamId}/projects`,
    projectFiles: (projectId) => `https://api.figma.com/v1/projects/${projectId}/files`,
    file: (fileId) => `https://api.figma.com/v1/files/${fileId}`
}

export const getFigmaApiHeaders = (apiKey) => {
    return {
        'X-Figma-Token': apiKey
    }
}
