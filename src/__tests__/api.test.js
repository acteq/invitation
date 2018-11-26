import axios from 'axios'
import {requestInvite} from '../api'

jest.mock('axios');

it('test api fake-auth for', () => {
    axios.post.mockResolvedValue({data:'Registered'})
    return requestInvite('testme', 'testme@test.com')
        .then( data=> { 
            expect(data).toBe('Registered')
        })
});

it('test api fake-auth for duplicate email request ', () => {
    return requestInvite('testme', 'usedemail@airwallex.com')
        .catch(error => {
            expect(error).toMatch(/already/)
        });
});