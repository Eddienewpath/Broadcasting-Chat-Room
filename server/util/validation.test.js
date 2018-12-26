const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        let nonStr = 2;
        let res = isRealString(2);
        expect(res).toBe(false);
    });

    it('should reject string with only spaces', () => {
        let str = '   ';
        let res = isRealString(str);
        expect(res).toBe(false);
    });

    it('should allow string with non space char', () => {
        let res = isRealString('  eddie   ');
        expect(res).toBe(true);
    })
});