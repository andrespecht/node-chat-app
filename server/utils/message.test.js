var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {

it('should generate the correct message object', () => {
    
    const from = "as@example.com";
    const text = "how are you";

    var res = generateMessage(from,text);

    expect(res.from).toBe(from);
    expect(res.text).toBe(text);
    expect(res.createdAt).toBeA('number');

});

});

describe('generate location message', () => {

    it('should generate correct location message', () =>{
        const googleUrl = 'https://www.google.com/maps?q=';
        const lat = '1';
        const long = '2';
        var result = generateLocationMessage('Admin', lat,long);

        expect(result.from).toBe('Admin');
        expect(result.url).toBe(`${googleUrl}${lat},${long}`);
        expect(result.createdAt).toBeA('number');
    });

});