import { redirect } from '@sveltejs/kit'

export async function handle({ event, resolve }) {
    console.log(event)
    const is_logged_in = event.cookies.get('auth')

    if (!is_logged_in && event.url.pathname != '/user/login') {
        return redirect(302, '/user/login')
    }

    return await resolve(event)
}