# Estructura del Proyecto de Clean Architecture

Separación de Capas para poder cumplir las reglas correctamente.

1. CAPA EXTERNA -> FRAMEWORK / DRIVER / UI -> Detalles de implementación (No posee impacto).
2. ADAPTERS -> Nexo entre USE CASE y la capa Externa.
3. USE CASE -> Reglas de aplicación.
4. DOMAIN ->

Se trabajará desde afuera hacía adentro.

- Nunca acceder de manera directa a una capa externa. Neceistamos un adapter. Jamas podremos hacer que 
el USE CASE se comunique directamente con una capa externa.
- El Adapter hace que lo que entre va a poder ser comodo de accionar, desde el Use Case o la Capa Externa. 
Es una bicomunicación.

# Desarrollo

Vamos a comunicarnos con una entidad externa (REPOSITORY). Donde allí manejaremos la lista de los usuarios.
Es por donde empezaremos primeramente. 

## INTERFACE

- Se creará una Interface porque debe tener un tipado. Relacionado a Programación Orientación a Objetos.

```
interface DBBankAccount {
    id: string;
    data: any;
}
```

## DB

- Aca es donde se trabaja con la Base de Datos

```
class DBBank {
    listOfAccounts: any = new Map<string, any>
}

```

