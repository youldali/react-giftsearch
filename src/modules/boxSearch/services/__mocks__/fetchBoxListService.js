jest.genMockFromModule('../fetchBoxListService');

const box1 = {'id': 1, name: 'stay in Paris', 'city': 'Paris', 'price': 25, forOnePerson: 1, forCouple: 0, experienceType: ['boat', 'car', 'parachute']};
const box2 = {'id': 2, name: 'stay in Lyon', 'city': 'Lyon', 'price': 40, forOnePerson: 0, forCouple: 1, experienceType: ['car']};
const box3 = {'id': 3, name: 'stay in barcelona', 'city': 'Barcelona', 'price': 120, forOnePerson: 1, forCouple: 0, experienceType: ['boat']};
const box4 = {'id': 4, name: 'eat in Lyon', 'city': 'Lyon', 'price': 199, forOnePerson: 1, forCouple: 0, experienceType: ['boat', 'plane']};
const box5 = {'id': 5, name: 'stay in Dublin', 'city': 'Dublin', 'price': 301, forOnePerson: 1, forCouple: 1, experienceType: ['parachute']};
const box6 = {'id': 6, name: 'cycle in Lyon', 'city': 'Lyon', 'price': 600, forOnePerson: 0, forCouple: 1, experienceType: ['boat', 'car']};
const box7 = {'id': 7, name: 'stay in Lyon 2', 'city': 'Lyon', 'price': 700, forOnePerson: 0, forCouple: 1, experienceType: ['boat', 'car', 'plane']};
const box8 = {'id': 8, name: 'stay in Lyon 3', 'city': 'Lyon', 'price': 800, forOnePerson: 0, forCouple: 1, experienceType: ['boat', 'car']};
const box9 = {'id': 9, name: 'eat in Paris', 'city': 'Paris', 'price': 900, forOnePerson: 0, forCouple: 1, experienceType: ['plane']};
const box10 = {'id':10, name: 'stay in Berlin', 'city': 'Berlin', 'price': 1000, forOnePerson: 0, forCouple: 1, experienceType: ['boat', 'plane']};

export 
const boxes = {box1, box2, box3, box4, box5, box6, box7, box8, box9, box10};

export
const boxCollection = [box1, box2, box3, box4, box5, box6, box7, box8, box9, box10];

export default 
async (universe) => Promise.resolve({data: boxCollection});