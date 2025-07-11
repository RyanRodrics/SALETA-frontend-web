export default interface sessionProps {
    tipo:"buscar"|"guardar"|"admin";

}
export interface sessionUser{
    user:string
    role?:"admin"|"student"|"guard"
    _id:string
}