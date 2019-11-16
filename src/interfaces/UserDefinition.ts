export default interface UserDefinition {
    categoryId: string;
    definitionData: {
        elementId: string;
        elementProperties: {
            script: string;
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
