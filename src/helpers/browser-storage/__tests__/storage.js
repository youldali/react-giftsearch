import * as universeStorage from '../storage';
import localforage from 'localforage';

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
const localforageMockGenerator = function (willResolve, storage){
	return {
		setItem: (key, value) => {
			return (
				new Promise((resolve, reject) => {
					if(willResolve){
						storage[key] = value;
						resolve(value);
					}
					else{
						reject('Error localforage');
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
						reject('Error localforage');
					}
				})
			);
		}

	};
}

describe('localforage succeeds', () => {
	let storage = {};
	beforeAll(() => {
		storage = {...storageMock};
		jest.spyOn(localforage, 'setItem').mockImplementation((key, value) => localforageMockGenerator(true, storage).setItem(key, value));
		jest.spyOn(localforage, 'getItem').mockImplementation((key) => localforageMockGenerator(true, storage).getItem(key));
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
		return universeStorage.saveToStorage('sejour', sejourList)
						.then((sejourListReturned) => {
							expect(sejourListReturned).toEqual(sejourList);
							expect(storage).toEqual(expectedStorage);
						});		

	});

	test('it gets a list from the storage', () => {
		const expectedStorage = storageMock.gastronomy;
		return expect(universeStorage.getFromStorage('gastronomy')).resolves.toEqual(expectedStorage);
	});	
});

describe('localforage fails', () => {
	let storage = {};
	beforeAll(() => {
		storage = {...storageMock};
		jest.spyOn(localforage, 'setItem').mockImplementation((key, value) => localforageMockGenerator(false, storage).setItem(key, value));
		jest.spyOn(localforage, 'getItem').mockImplementation((key) => localforageMockGenerator(false, storage).getItem(key));
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
		return expect(universeStorage.saveToStorage('gastronomy', sejourList)).rejects.toBeDefined();
	});

	test('it gets a list from the storage', () => {
		const expectedStorage = storageMock.gastronomy;
		return expect(universeStorage.getFromStorage('Undefined Category')).rejects.toBeDefined();
	});	
});