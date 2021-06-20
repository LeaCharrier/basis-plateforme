export const figmaApi = {
    teamProjects: (teamId) => `https://api.figma.com/v1/teams/${teamId}/projects`,
    projectFiles: (projectId) => `https://api.figma.com/v1/projects/${projectId}/files`,
    file: (fileId) => `https://api.figma.com/v1/files/${fileId}`,
    teamStyles: (teamId) => `https://api.figma.com/v1/teams/${teamId}/styles`
}

export const getFigmaApiHeaders = (apiKey) => {
    return {
        'X-Figma-Token': apiKey,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Accept-Encoding': 'gzip, deflate, br',
        Accept: '*/*',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive'
    }
}
