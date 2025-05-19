import { INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';

export class PeriHub implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'PeriHub',
		name: 'periHub',
		icon: 'file:PeriHubLogo.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with PeriHub API',
		defaults: {
			name: 'PeriHub',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'perihubApi',
				required: false,
			},
		],
		requestDefaults: {
			baseURL: 'https://perihub.nimbus.dlr.de/api',
			url: '',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Models',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				default: 'model.getModels',
				options: [
					{
						name: 'Get Models',
						value: 'model.getModels',
						action: 'Get Models',
						description: 'Get the predefined PeriHub models',
						routing: {
							request: {
								method: 'GET',
								url: '/model/getModels',
							},
						},
					},
					{
						name: 'Get Own Models',
						value: 'model.getOwnModels',
						action: 'Get Own Models',
						description: 'Get your own predefined models',
						routing: {
							request: {
								method: 'GET',
								url: '/model/getOwnModels',
							},
						},
					},
				],
			},
			{
				displayName: 'Model Name',
				name: 'modelName',
				type: 'string',
				required: true, // Whether the field is required or not
				default: 'Dogbone',
				description: 'The name of the model',
			},
			{
				displayName: 'Jobs',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				default: 'jobs.getStatus',
				displayOptions: {
					show: {
						modelName: ['Dogbone'],
					},
				},
				options: [
					{
						name: 'Get Status',
						value: 'jobs.getStatus',
						action: 'Get Status',
						description: 'Get the current status of a job',
						routing: {
							request: {
								method: 'GET',
								url: '/jobs/getStatus',
							},
						},
					},
				],
			},
		],
	};
}
