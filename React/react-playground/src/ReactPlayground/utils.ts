export const getFileNameLanguage = (fileName: string) => {
    const suffix = fileName.split('.').pop();
    const languageMap = {
        'tsx': 'typescript',
        'ts': 'typescript',
        'jsx': 'javascript',
        'js': 'javascript',
        'css': 'css',
        'json': 'json',
    }
    if(!suffix) {
        return 'javascript';
    } else {
        return languageMap[suffix as keyof typeof languageMap] || 'javascript';
    }
}  