import { redirect } from '@sveltejs/kit';

export const actions = {
    login: async ({ cookies, request }) => {
        const formData = await request.formData();
        const username: string = formData.get('username')! as string;
        const password: string = formData.get('password')! as string;

        cookies.set('auth', username, { path: '/' });
        redirect(301, '/')
    }
}