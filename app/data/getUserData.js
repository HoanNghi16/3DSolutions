"use client"
import { get_login_status } from '../lib/api/handle_login';

export default async function userData(){
    const res = await get_login_status();
    const data = {name: res.profile.name, avt: res.avt}
    localStorage.setItem('userData', JSON.stringify(data));
}