import * as universeStorage from '../fetchGiftsStorage';
import localForage from 'localForage';

const storageMock = {
	'gastronomy': [
		{
			id: 100,
			name: 'adrenaline',
			price: 550
		},
		{
			id: 201,
			name: 'cars',
			price: 3000
		}
	]
};
const localForageMockGenerator = function (willResolve, storage){
	return {
		setItem: jest.fn((key, value) => {
			return new Promise((resolve, reject) => {
				if(willResolve){
					storage[key] = value;
					resolve(value);
				}
				else{
						reject('Error LocalForage');
				}
			});
		}),

		getItem: jest.fn((key) => {
			return new Promise((resolve, reject) => {
				if(willResolve){
					resolve(storage[key]);
				}
				else{
					reject('Error LocalForage');
				}
			})
		}),

	}
}

describe.skip('localForage succeeds', () => {
	let storage = {};
	beforeAll(() => {
		storage = {...storageMock};
		localForage.setItem = localForageMockGenerator(true, storage).setItem;
		localForage.getItem = localForageMockGenerator(true, storage).getItem;
	})


	test('it saves a list to the storage', () => {
		const sejourList =[
			{
				id: 1,
				name: 'sejour Paris',
				price: 200
			},
			{
				id: 201,
				name: 'sejour Dublin',
				price: 100
			}
		];

		const expectedStorage = {...storageMock, 'sejour': sejourList};
		universeStorage.storageSaveGifts('sejour', sejourList)
			.then(() => {
				expect(storage).toEqual(expectedStorage);
			});
		
	});

	test('it gets a list from the storage', () => {
		const expectedStorage = storageMock.gastronomy;
		expect(universeStorage.storageGetGifts('gastronomy'))
			.resolves.toEqual(expectedStorage);	
	});	
});
