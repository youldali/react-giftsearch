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
		setItem: (key, value) => {
			return (
				new Promise((resolve, reject) => {
					if(willResolve){
						storage[key] = value;
						resolve(value);
					}
					else{
						reject('Error LocalForage');
					}
				})
			);
		},

		getItem: (key) => {
			return (
				new Promise((resolve, reject) => {
					if(willResolve){
						resolve(storage[key]);
					}
					else{
						reject('Error LocalForage');
					}
				})
			);
		}

	};
}

describe('localForage succeeds', () => {
	let storage = {};
	beforeAll(() => {
		storage = {...storageMock};
		jest.spyOn(localForage, 'setItem').mockImplementation((key, value) => localForageMockGenerator(true, storage).setItem(key, value));
		jest.spyOn(localForage, 'getItem').mockImplementation((key) => localForageMockGenerator(true, storage).getItem(key));
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
		return universeStorage.storageSaveGifts('sejour', sejourList)
						.then((sejourListReturned) => {
							expect(sejourListReturned).toEqual(sejourList);
							expect(storage).toEqual(expectedStorage);
						});		

	});

	test('it gets a list from the storage', () => {
		const expectedStorage = storageMock.gastronomy;
		return expect(universeStorage.storageGetGifts('gastronomy')).resolves.toEqual(expectedStorage);
	});	
});

describe('localForage fails', () => {
	let storage = {};
	beforeAll(() => {
		storage = {...storageMock};
		jest.spyOn(localForage, 'setItem').mockImplementation((key, value) => localForageMockGenerator(false, storage).setItem(key, value));
		jest.spyOn(localForage, 'getItem').mockImplementation((key) => localForageMockGenerator(false, storage).getItem(key));
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
		return expect(universeStorage.storageGetGifts('gastronomy')).rejects.toBeDefined();
	});

	test('it gets a list from the storage', () => {
		const expectedStorage = storageMock.gastronomy;
		return expect(universeStorage.storageGetGifts('Undefined Category')).rejects.toBeDefined();
	});	
});