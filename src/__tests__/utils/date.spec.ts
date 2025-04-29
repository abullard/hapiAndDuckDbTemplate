import { formatDuckDbDate } from '../../utils/date';

describe('utils date', () => {
    describe('fn(formatDuckDbDate)', () => {
        it('should return a date string in format yyyy-mm-dd', () => {
            const dateOne: Date = new Date('03/21/2001');
            const dateTwo: Date = new Date('05/9/2022');

            const actualOne = formatDuckDbDate(dateOne);
            const actualTwo = formatDuckDbDate(dateTwo);

            const expectedOne = '2001-03-21';
            const expectedTwo = '2022-05-09';

            expect(actualOne).toEqual(expectedOne);
            expect(actualTwo).toEqual(expectedTwo);
        });
    });
});