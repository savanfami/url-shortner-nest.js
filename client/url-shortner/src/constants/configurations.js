const token=localStorage.getItem('userToken')

export const config = {
    headers: { 
        'Authorization': `Bearer ${token}`
     }
}
