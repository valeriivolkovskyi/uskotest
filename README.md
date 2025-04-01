## Notes

1. Following Clean Architecture principles, I moved the Controllers
   from the **Application layer** to the **Interface Adapters layer**.
2. I'm decided to store factory in **Application layer** because this layer is responsible for creating domain instances
   from inner layers input and don't violate the **Dependency Rule**.
3. Business validation rules moved to domain layer, input data validation rules are storing in application layer (DTO
   and Factory).

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start
```