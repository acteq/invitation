import {checkEmail, checkRequest} from '../biz'

it('check email format using "testme@test.com"', () => {
    expect(checkEmail('testme@test.com')).toBe(true)
});

it('check email format using "testme@"', () => {
    expect(checkEmail('testme@')).toBe(false)
});

it('check request format with full name error ', () => {
    expect(checkRequest('te')).toBe(1)
});

it('check email format with email error', () => {
    expect(checkRequest('test', 'testme@')).toBe(2)
});

it('check email format with confirm email error', () => {
    expect(checkRequest('test', 'testme@test.com', 'er')).toBe(3)
});

it('check email format with email not equal confirmEmail', () => {
    expect(checkRequest('test', 'testme@test.com', 'ere@test.com')).toBe(4)
});

it('check email format using valid format', () => {
    expect(checkRequest('test', 'testme@test.com', 'testme@test.com')).toBe(0)
});