export default interface UserDefinition {
    categoryId: string;
    definitionData: {
        elementId: string;
        elementProperties: {
            // JavaScript定義
            script: string;
            // SQL定義
            connectId: string;
            databaseType: string;
            limitation: boolean;
            query: string;
            queryType: string;
            // Template
            defaultTemplate: string;
        }
        iconId: string;
        inputDataDefinition: {
            entrypoint: {
                basic: boolean;
                listingType: string;
                required: boolean;
                typeId: string;
            },
            typeDefinitions: [
                {
                    id: string;
                    properties: []
                }
            ],
        };
        outputDataDefinition: {
            entrypoint: {
                basic: boolean;
                listingType: string;
                required: boolean;
                typeId: string;
            },
            typeDefinitions: [
                {
                    id: string;
                    properties: []
                }
            ],
        }
    };
    definitionId: string;
    definitionName: string;
    definitionType: string;
    localize: {};
    sortNumber: number;
    version: number;
}
