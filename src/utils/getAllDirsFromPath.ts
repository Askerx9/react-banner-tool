const getAllDirsFromPath = (path: string): string[] => {
    const regex = /{([^}]+)}/g;
    const matches = path.match(regex);
    if(matches) return matches[0].replace('{', '').replace('}', '').replace(/ /g, '').split(',');
    return [path];
}

export default getAllDirsFromPath;