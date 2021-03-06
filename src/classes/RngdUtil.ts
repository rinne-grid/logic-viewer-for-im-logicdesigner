import UserDefinition from '@/interfaces/UserDefinition';
export default class RngdUtil {
    public static userDefinitionType2Extension(type: string): string {
        let extension = type;
        switch (type) {
            case 'rest':
                extension = 'json';
                break;
            case 'template':
                extension = 'ftl';
                break;
            case 'others':
                extension = 'json';
                break;
            case 'javascript':
                extension = 'js';
                break;
         }
        return extension;
    }
    public static getSourcePrimaryKey(targetObj: UserDefinition): string {
        return `${targetObj.definitionId}${targetObj.version}`;
    }
}
