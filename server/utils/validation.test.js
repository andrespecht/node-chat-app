const expect = require('expect');

const { isRealString } = require('./validation');

describe('enter room validation', () => {

    it('should reject non string values',() => {
        var nonstring = 123;
        var result = isRealString(nonstring);
        expect(result).toBeFalsy();
    });

    it('should reject string with only spaces', () => {
        var nonstring = "   ";
        var result = isRealString(nonstring);
        expect(result).toBeFalsy();
    });

    it('should allow string with characters', () => {
        var nonstring = "dfsdf";
        var result = isRealString(nonstring);
        expect(result).toBeTruthy();
    });
});