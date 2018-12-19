let expect = require('expect');
let {generateMessage} = require('./message');

describe('generateMessage', () => {
    // this a a syncronous fucntion so no need to call done. 
    it('should generate correct message object', () => {
        let from = 'eddie';
        let text = 'hi there';
        let message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, text});
    });
});