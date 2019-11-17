import UserDefinition from '@/interfaces/UserDefinition';
export default class UserDefinitionDivideType {
    public js: UserDefinition[];
    public sql: UserDefinition[];
    public rest: UserDefinition[];
    public template: UserDefinition[];
    public others: UserDefinition[];
    constructor() {
        this.js = [];
        this.sql = [];
        this.rest = [];
        this.template = [];
        this.others = [];
    }
}
