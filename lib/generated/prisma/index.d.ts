
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Cliente
 * 
 */
export type Cliente = $Result.DefaultSelection<Prisma.$ClientePayload>
/**
 * Model Veiculo
 * 
 */
export type Veiculo = $Result.DefaultSelection<Prisma.$VeiculoPayload>
/**
 * Model Modelo
 * 
 */
export type Modelo = $Result.DefaultSelection<Prisma.$ModeloPayload>
/**
 * Model Cor
 * 
 */
export type Cor = $Result.DefaultSelection<Prisma.$CorPayload>
/**
 * Model Fabricante
 * 
 */
export type Fabricante = $Result.DefaultSelection<Prisma.$FabricantePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Clientes
 * const clientes = await prisma.cliente.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Clientes
   * const clientes = await prisma.cliente.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.cliente`: Exposes CRUD operations for the **Cliente** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Clientes
    * const clientes = await prisma.cliente.findMany()
    * ```
    */
  get cliente(): Prisma.ClienteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.veiculo`: Exposes CRUD operations for the **Veiculo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Veiculos
    * const veiculos = await prisma.veiculo.findMany()
    * ```
    */
  get veiculo(): Prisma.VeiculoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.modelo`: Exposes CRUD operations for the **Modelo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Modelos
    * const modelos = await prisma.modelo.findMany()
    * ```
    */
  get modelo(): Prisma.ModeloDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cor`: Exposes CRUD operations for the **Cor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Cors
    * const cors = await prisma.cor.findMany()
    * ```
    */
  get cor(): Prisma.CorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.fabricante`: Exposes CRUD operations for the **Fabricante** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Fabricantes
    * const fabricantes = await prisma.fabricante.findMany()
    * ```
    */
  get fabricante(): Prisma.FabricanteDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Cliente: 'Cliente',
    Veiculo: 'Veiculo',
    Modelo: 'Modelo',
    Cor: 'Cor',
    Fabricante: 'Fabricante'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "cliente" | "veiculo" | "modelo" | "cor" | "fabricante"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Cliente: {
        payload: Prisma.$ClientePayload<ExtArgs>
        fields: Prisma.ClienteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClienteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClienteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>
          }
          findFirst: {
            args: Prisma.ClienteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClienteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>
          }
          findMany: {
            args: Prisma.ClienteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>[]
          }
          create: {
            args: Prisma.ClienteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>
          }
          createMany: {
            args: Prisma.ClienteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClienteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>[]
          }
          delete: {
            args: Prisma.ClienteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>
          }
          update: {
            args: Prisma.ClienteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>
          }
          deleteMany: {
            args: Prisma.ClienteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClienteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClienteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>[]
          }
          upsert: {
            args: Prisma.ClienteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientePayload>
          }
          aggregate: {
            args: Prisma.ClienteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCliente>
          }
          groupBy: {
            args: Prisma.ClienteGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClienteGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClienteCountArgs<ExtArgs>
            result: $Utils.Optional<ClienteCountAggregateOutputType> | number
          }
        }
      }
      Veiculo: {
        payload: Prisma.$VeiculoPayload<ExtArgs>
        fields: Prisma.VeiculoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VeiculoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VeiculoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VeiculoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VeiculoPayload>
          }
          findFirst: {
            args: Prisma.VeiculoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VeiculoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VeiculoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VeiculoPayload>
          }
          findMany: {
            args: Prisma.VeiculoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VeiculoPayload>[]
          }
          create: {
            args: Prisma.VeiculoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VeiculoPayload>
          }
          createMany: {
            args: Prisma.VeiculoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VeiculoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VeiculoPayload>[]
          }
          delete: {
            args: Prisma.VeiculoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VeiculoPayload>
          }
          update: {
            args: Prisma.VeiculoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VeiculoPayload>
          }
          deleteMany: {
            args: Prisma.VeiculoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VeiculoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VeiculoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VeiculoPayload>[]
          }
          upsert: {
            args: Prisma.VeiculoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VeiculoPayload>
          }
          aggregate: {
            args: Prisma.VeiculoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVeiculo>
          }
          groupBy: {
            args: Prisma.VeiculoGroupByArgs<ExtArgs>
            result: $Utils.Optional<VeiculoGroupByOutputType>[]
          }
          count: {
            args: Prisma.VeiculoCountArgs<ExtArgs>
            result: $Utils.Optional<VeiculoCountAggregateOutputType> | number
          }
        }
      }
      Modelo: {
        payload: Prisma.$ModeloPayload<ExtArgs>
        fields: Prisma.ModeloFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ModeloFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModeloPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ModeloFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModeloPayload>
          }
          findFirst: {
            args: Prisma.ModeloFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModeloPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ModeloFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModeloPayload>
          }
          findMany: {
            args: Prisma.ModeloFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModeloPayload>[]
          }
          create: {
            args: Prisma.ModeloCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModeloPayload>
          }
          createMany: {
            args: Prisma.ModeloCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ModeloCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModeloPayload>[]
          }
          delete: {
            args: Prisma.ModeloDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModeloPayload>
          }
          update: {
            args: Prisma.ModeloUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModeloPayload>
          }
          deleteMany: {
            args: Prisma.ModeloDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ModeloUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ModeloUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModeloPayload>[]
          }
          upsert: {
            args: Prisma.ModeloUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModeloPayload>
          }
          aggregate: {
            args: Prisma.ModeloAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateModelo>
          }
          groupBy: {
            args: Prisma.ModeloGroupByArgs<ExtArgs>
            result: $Utils.Optional<ModeloGroupByOutputType>[]
          }
          count: {
            args: Prisma.ModeloCountArgs<ExtArgs>
            result: $Utils.Optional<ModeloCountAggregateOutputType> | number
          }
        }
      }
      Cor: {
        payload: Prisma.$CorPayload<ExtArgs>
        fields: Prisma.CorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorPayload>
          }
          findFirst: {
            args: Prisma.CorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorPayload>
          }
          findMany: {
            args: Prisma.CorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorPayload>[]
          }
          create: {
            args: Prisma.CorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorPayload>
          }
          createMany: {
            args: Prisma.CorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorPayload>[]
          }
          delete: {
            args: Prisma.CorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorPayload>
          }
          update: {
            args: Prisma.CorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorPayload>
          }
          deleteMany: {
            args: Prisma.CorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorPayload>[]
          }
          upsert: {
            args: Prisma.CorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CorPayload>
          }
          aggregate: {
            args: Prisma.CorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCor>
          }
          groupBy: {
            args: Prisma.CorGroupByArgs<ExtArgs>
            result: $Utils.Optional<CorGroupByOutputType>[]
          }
          count: {
            args: Prisma.CorCountArgs<ExtArgs>
            result: $Utils.Optional<CorCountAggregateOutputType> | number
          }
        }
      }
      Fabricante: {
        payload: Prisma.$FabricantePayload<ExtArgs>
        fields: Prisma.FabricanteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FabricanteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FabricantePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FabricanteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FabricantePayload>
          }
          findFirst: {
            args: Prisma.FabricanteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FabricantePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FabricanteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FabricantePayload>
          }
          findMany: {
            args: Prisma.FabricanteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FabricantePayload>[]
          }
          create: {
            args: Prisma.FabricanteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FabricantePayload>
          }
          createMany: {
            args: Prisma.FabricanteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FabricanteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FabricantePayload>[]
          }
          delete: {
            args: Prisma.FabricanteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FabricantePayload>
          }
          update: {
            args: Prisma.FabricanteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FabricantePayload>
          }
          deleteMany: {
            args: Prisma.FabricanteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FabricanteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FabricanteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FabricantePayload>[]
          }
          upsert: {
            args: Prisma.FabricanteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FabricantePayload>
          }
          aggregate: {
            args: Prisma.FabricanteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFabricante>
          }
          groupBy: {
            args: Prisma.FabricanteGroupByArgs<ExtArgs>
            result: $Utils.Optional<FabricanteGroupByOutputType>[]
          }
          count: {
            args: Prisma.FabricanteCountArgs<ExtArgs>
            result: $Utils.Optional<FabricanteCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    cliente?: ClienteOmit
    veiculo?: VeiculoOmit
    modelo?: ModeloOmit
    cor?: CorOmit
    fabricante?: FabricanteOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model Cliente
   */

  export type AggregateCliente = {
    _count: ClienteCountAggregateOutputType | null
    _avg: ClienteAvgAggregateOutputType | null
    _sum: ClienteSumAggregateOutputType | null
    _min: ClienteMinAggregateOutputType | null
    _max: ClienteMaxAggregateOutputType | null
  }

  export type ClienteAvgAggregateOutputType = {
    id: number | null
    cidade_id: number | null
  }

  export type ClienteSumAggregateOutputType = {
    id: number | null
    cidade_id: number | null
  }

  export type ClienteMinAggregateOutputType = {
    id: number | null
    nome_completo: string | null
    cpf_cnpj: string | null
    rg: string | null
    telefone: string | null
    rua: string | null
    email: string | null
    cidade_id: number | null
    cep: string | null
    bairro: string | null
    numero_casa: string | null
    data: Date | null
  }

  export type ClienteMaxAggregateOutputType = {
    id: number | null
    nome_completo: string | null
    cpf_cnpj: string | null
    rg: string | null
    telefone: string | null
    rua: string | null
    email: string | null
    cidade_id: number | null
    cep: string | null
    bairro: string | null
    numero_casa: string | null
    data: Date | null
  }

  export type ClienteCountAggregateOutputType = {
    id: number
    nome_completo: number
    cpf_cnpj: number
    rg: number
    telefone: number
    rua: number
    email: number
    cidade_id: number
    cep: number
    bairro: number
    numero_casa: number
    data: number
    _all: number
  }


  export type ClienteAvgAggregateInputType = {
    id?: true
    cidade_id?: true
  }

  export type ClienteSumAggregateInputType = {
    id?: true
    cidade_id?: true
  }

  export type ClienteMinAggregateInputType = {
    id?: true
    nome_completo?: true
    cpf_cnpj?: true
    rg?: true
    telefone?: true
    rua?: true
    email?: true
    cidade_id?: true
    cep?: true
    bairro?: true
    numero_casa?: true
    data?: true
  }

  export type ClienteMaxAggregateInputType = {
    id?: true
    nome_completo?: true
    cpf_cnpj?: true
    rg?: true
    telefone?: true
    rua?: true
    email?: true
    cidade_id?: true
    cep?: true
    bairro?: true
    numero_casa?: true
    data?: true
  }

  export type ClienteCountAggregateInputType = {
    id?: true
    nome_completo?: true
    cpf_cnpj?: true
    rg?: true
    telefone?: true
    rua?: true
    email?: true
    cidade_id?: true
    cep?: true
    bairro?: true
    numero_casa?: true
    data?: true
    _all?: true
  }

  export type ClienteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Cliente to aggregate.
     */
    where?: ClienteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clientes to fetch.
     */
    orderBy?: ClienteOrderByWithRelationInput | ClienteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClienteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clientes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Clientes
    **/
    _count?: true | ClienteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ClienteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ClienteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClienteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClienteMaxAggregateInputType
  }

  export type GetClienteAggregateType<T extends ClienteAggregateArgs> = {
        [P in keyof T & keyof AggregateCliente]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCliente[P]>
      : GetScalarType<T[P], AggregateCliente[P]>
  }




  export type ClienteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClienteWhereInput
    orderBy?: ClienteOrderByWithAggregationInput | ClienteOrderByWithAggregationInput[]
    by: ClienteScalarFieldEnum[] | ClienteScalarFieldEnum
    having?: ClienteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClienteCountAggregateInputType | true
    _avg?: ClienteAvgAggregateInputType
    _sum?: ClienteSumAggregateInputType
    _min?: ClienteMinAggregateInputType
    _max?: ClienteMaxAggregateInputType
  }

  export type ClienteGroupByOutputType = {
    id: number
    nome_completo: string
    cpf_cnpj: string
    rg: string
    telefone: string
    rua: string
    email: string
    cidade_id: number
    cep: string
    bairro: string
    numero_casa: string
    data: Date
    _count: ClienteCountAggregateOutputType | null
    _avg: ClienteAvgAggregateOutputType | null
    _sum: ClienteSumAggregateOutputType | null
    _min: ClienteMinAggregateOutputType | null
    _max: ClienteMaxAggregateOutputType | null
  }

  type GetClienteGroupByPayload<T extends ClienteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClienteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClienteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClienteGroupByOutputType[P]>
            : GetScalarType<T[P], ClienteGroupByOutputType[P]>
        }
      >
    >


  export type ClienteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome_completo?: boolean
    cpf_cnpj?: boolean
    rg?: boolean
    telefone?: boolean
    rua?: boolean
    email?: boolean
    cidade_id?: boolean
    cep?: boolean
    bairro?: boolean
    numero_casa?: boolean
    data?: boolean
  }, ExtArgs["result"]["cliente"]>

  export type ClienteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome_completo?: boolean
    cpf_cnpj?: boolean
    rg?: boolean
    telefone?: boolean
    rua?: boolean
    email?: boolean
    cidade_id?: boolean
    cep?: boolean
    bairro?: boolean
    numero_casa?: boolean
    data?: boolean
  }, ExtArgs["result"]["cliente"]>

  export type ClienteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome_completo?: boolean
    cpf_cnpj?: boolean
    rg?: boolean
    telefone?: boolean
    rua?: boolean
    email?: boolean
    cidade_id?: boolean
    cep?: boolean
    bairro?: boolean
    numero_casa?: boolean
    data?: boolean
  }, ExtArgs["result"]["cliente"]>

  export type ClienteSelectScalar = {
    id?: boolean
    nome_completo?: boolean
    cpf_cnpj?: boolean
    rg?: boolean
    telefone?: boolean
    rua?: boolean
    email?: boolean
    cidade_id?: boolean
    cep?: boolean
    bairro?: boolean
    numero_casa?: boolean
    data?: boolean
  }

  export type ClienteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome_completo" | "cpf_cnpj" | "rg" | "telefone" | "rua" | "email" | "cidade_id" | "cep" | "bairro" | "numero_casa" | "data", ExtArgs["result"]["cliente"]>

  export type $ClientePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Cliente"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nome_completo: string
      cpf_cnpj: string
      rg: string
      telefone: string
      rua: string
      email: string
      cidade_id: number
      cep: string
      bairro: string
      numero_casa: string
      data: Date
    }, ExtArgs["result"]["cliente"]>
    composites: {}
  }

  type ClienteGetPayload<S extends boolean | null | undefined | ClienteDefaultArgs> = $Result.GetResult<Prisma.$ClientePayload, S>

  type ClienteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClienteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClienteCountAggregateInputType | true
    }

  export interface ClienteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Cliente'], meta: { name: 'Cliente' } }
    /**
     * Find zero or one Cliente that matches the filter.
     * @param {ClienteFindUniqueArgs} args - Arguments to find a Cliente
     * @example
     * // Get one Cliente
     * const cliente = await prisma.cliente.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClienteFindUniqueArgs>(args: SelectSubset<T, ClienteFindUniqueArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Cliente that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClienteFindUniqueOrThrowArgs} args - Arguments to find a Cliente
     * @example
     * // Get one Cliente
     * const cliente = await prisma.cliente.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClienteFindUniqueOrThrowArgs>(args: SelectSubset<T, ClienteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Cliente that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteFindFirstArgs} args - Arguments to find a Cliente
     * @example
     * // Get one Cliente
     * const cliente = await prisma.cliente.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClienteFindFirstArgs>(args?: SelectSubset<T, ClienteFindFirstArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Cliente that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteFindFirstOrThrowArgs} args - Arguments to find a Cliente
     * @example
     * // Get one Cliente
     * const cliente = await prisma.cliente.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClienteFindFirstOrThrowArgs>(args?: SelectSubset<T, ClienteFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Clientes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Clientes
     * const clientes = await prisma.cliente.findMany()
     * 
     * // Get first 10 Clientes
     * const clientes = await prisma.cliente.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clienteWithIdOnly = await prisma.cliente.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClienteFindManyArgs>(args?: SelectSubset<T, ClienteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Cliente.
     * @param {ClienteCreateArgs} args - Arguments to create a Cliente.
     * @example
     * // Create one Cliente
     * const Cliente = await prisma.cliente.create({
     *   data: {
     *     // ... data to create a Cliente
     *   }
     * })
     * 
     */
    create<T extends ClienteCreateArgs>(args: SelectSubset<T, ClienteCreateArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Clientes.
     * @param {ClienteCreateManyArgs} args - Arguments to create many Clientes.
     * @example
     * // Create many Clientes
     * const cliente = await prisma.cliente.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClienteCreateManyArgs>(args?: SelectSubset<T, ClienteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Clientes and returns the data saved in the database.
     * @param {ClienteCreateManyAndReturnArgs} args - Arguments to create many Clientes.
     * @example
     * // Create many Clientes
     * const cliente = await prisma.cliente.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Clientes and only return the `id`
     * const clienteWithIdOnly = await prisma.cliente.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClienteCreateManyAndReturnArgs>(args?: SelectSubset<T, ClienteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Cliente.
     * @param {ClienteDeleteArgs} args - Arguments to delete one Cliente.
     * @example
     * // Delete one Cliente
     * const Cliente = await prisma.cliente.delete({
     *   where: {
     *     // ... filter to delete one Cliente
     *   }
     * })
     * 
     */
    delete<T extends ClienteDeleteArgs>(args: SelectSubset<T, ClienteDeleteArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Cliente.
     * @param {ClienteUpdateArgs} args - Arguments to update one Cliente.
     * @example
     * // Update one Cliente
     * const cliente = await prisma.cliente.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClienteUpdateArgs>(args: SelectSubset<T, ClienteUpdateArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Clientes.
     * @param {ClienteDeleteManyArgs} args - Arguments to filter Clientes to delete.
     * @example
     * // Delete a few Clientes
     * const { count } = await prisma.cliente.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClienteDeleteManyArgs>(args?: SelectSubset<T, ClienteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clientes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Clientes
     * const cliente = await prisma.cliente.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClienteUpdateManyArgs>(args: SelectSubset<T, ClienteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clientes and returns the data updated in the database.
     * @param {ClienteUpdateManyAndReturnArgs} args - Arguments to update many Clientes.
     * @example
     * // Update many Clientes
     * const cliente = await prisma.cliente.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Clientes and only return the `id`
     * const clienteWithIdOnly = await prisma.cliente.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ClienteUpdateManyAndReturnArgs>(args: SelectSubset<T, ClienteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Cliente.
     * @param {ClienteUpsertArgs} args - Arguments to update or create a Cliente.
     * @example
     * // Update or create a Cliente
     * const cliente = await prisma.cliente.upsert({
     *   create: {
     *     // ... data to create a Cliente
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Cliente we want to update
     *   }
     * })
     */
    upsert<T extends ClienteUpsertArgs>(args: SelectSubset<T, ClienteUpsertArgs<ExtArgs>>): Prisma__ClienteClient<$Result.GetResult<Prisma.$ClientePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Clientes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteCountArgs} args - Arguments to filter Clientes to count.
     * @example
     * // Count the number of Clientes
     * const count = await prisma.cliente.count({
     *   where: {
     *     // ... the filter for the Clientes we want to count
     *   }
     * })
    **/
    count<T extends ClienteCountArgs>(
      args?: Subset<T, ClienteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClienteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Cliente.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClienteAggregateArgs>(args: Subset<T, ClienteAggregateArgs>): Prisma.PrismaPromise<GetClienteAggregateType<T>>

    /**
     * Group by Cliente.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClienteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClienteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClienteGroupByArgs['orderBy'] }
        : { orderBy?: ClienteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClienteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClienteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Cliente model
   */
  readonly fields: ClienteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Cliente.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClienteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Cliente model
   */
  interface ClienteFieldRefs {
    readonly id: FieldRef<"Cliente", 'Int'>
    readonly nome_completo: FieldRef<"Cliente", 'String'>
    readonly cpf_cnpj: FieldRef<"Cliente", 'String'>
    readonly rg: FieldRef<"Cliente", 'String'>
    readonly telefone: FieldRef<"Cliente", 'String'>
    readonly rua: FieldRef<"Cliente", 'String'>
    readonly email: FieldRef<"Cliente", 'String'>
    readonly cidade_id: FieldRef<"Cliente", 'Int'>
    readonly cep: FieldRef<"Cliente", 'String'>
    readonly bairro: FieldRef<"Cliente", 'String'>
    readonly numero_casa: FieldRef<"Cliente", 'String'>
    readonly data: FieldRef<"Cliente", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Cliente findUnique
   */
  export type ClienteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Filter, which Cliente to fetch.
     */
    where: ClienteWhereUniqueInput
  }

  /**
   * Cliente findUniqueOrThrow
   */
  export type ClienteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Filter, which Cliente to fetch.
     */
    where: ClienteWhereUniqueInput
  }

  /**
   * Cliente findFirst
   */
  export type ClienteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Filter, which Cliente to fetch.
     */
    where?: ClienteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clientes to fetch.
     */
    orderBy?: ClienteOrderByWithRelationInput | ClienteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clientes.
     */
    cursor?: ClienteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clientes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clientes.
     */
    distinct?: ClienteScalarFieldEnum | ClienteScalarFieldEnum[]
  }

  /**
   * Cliente findFirstOrThrow
   */
  export type ClienteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Filter, which Cliente to fetch.
     */
    where?: ClienteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clientes to fetch.
     */
    orderBy?: ClienteOrderByWithRelationInput | ClienteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clientes.
     */
    cursor?: ClienteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clientes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clientes.
     */
    distinct?: ClienteScalarFieldEnum | ClienteScalarFieldEnum[]
  }

  /**
   * Cliente findMany
   */
  export type ClienteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Filter, which Clientes to fetch.
     */
    where?: ClienteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clientes to fetch.
     */
    orderBy?: ClienteOrderByWithRelationInput | ClienteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Clientes.
     */
    cursor?: ClienteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clientes.
     */
    skip?: number
    distinct?: ClienteScalarFieldEnum | ClienteScalarFieldEnum[]
  }

  /**
   * Cliente create
   */
  export type ClienteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * The data needed to create a Cliente.
     */
    data: XOR<ClienteCreateInput, ClienteUncheckedCreateInput>
  }

  /**
   * Cliente createMany
   */
  export type ClienteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Clientes.
     */
    data: ClienteCreateManyInput | ClienteCreateManyInput[]
  }

  /**
   * Cliente createManyAndReturn
   */
  export type ClienteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * The data used to create many Clientes.
     */
    data: ClienteCreateManyInput | ClienteCreateManyInput[]
  }

  /**
   * Cliente update
   */
  export type ClienteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * The data needed to update a Cliente.
     */
    data: XOR<ClienteUpdateInput, ClienteUncheckedUpdateInput>
    /**
     * Choose, which Cliente to update.
     */
    where: ClienteWhereUniqueInput
  }

  /**
   * Cliente updateMany
   */
  export type ClienteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Clientes.
     */
    data: XOR<ClienteUpdateManyMutationInput, ClienteUncheckedUpdateManyInput>
    /**
     * Filter which Clientes to update
     */
    where?: ClienteWhereInput
    /**
     * Limit how many Clientes to update.
     */
    limit?: number
  }

  /**
   * Cliente updateManyAndReturn
   */
  export type ClienteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * The data used to update Clientes.
     */
    data: XOR<ClienteUpdateManyMutationInput, ClienteUncheckedUpdateManyInput>
    /**
     * Filter which Clientes to update
     */
    where?: ClienteWhereInput
    /**
     * Limit how many Clientes to update.
     */
    limit?: number
  }

  /**
   * Cliente upsert
   */
  export type ClienteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * The filter to search for the Cliente to update in case it exists.
     */
    where: ClienteWhereUniqueInput
    /**
     * In case the Cliente found by the `where` argument doesn't exist, create a new Cliente with this data.
     */
    create: XOR<ClienteCreateInput, ClienteUncheckedCreateInput>
    /**
     * In case the Cliente was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClienteUpdateInput, ClienteUncheckedUpdateInput>
  }

  /**
   * Cliente delete
   */
  export type ClienteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
    /**
     * Filter which Cliente to delete.
     */
    where: ClienteWhereUniqueInput
  }

  /**
   * Cliente deleteMany
   */
  export type ClienteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Clientes to delete
     */
    where?: ClienteWhereInput
    /**
     * Limit how many Clientes to delete.
     */
    limit?: number
  }

  /**
   * Cliente without action
   */
  export type ClienteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cliente
     */
    select?: ClienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cliente
     */
    omit?: ClienteOmit<ExtArgs> | null
  }


  /**
   * Model Veiculo
   */

  export type AggregateVeiculo = {
    _count: VeiculoCountAggregateOutputType | null
    _avg: VeiculoAvgAggregateOutputType | null
    _sum: VeiculoSumAggregateOutputType | null
    _min: VeiculoMinAggregateOutputType | null
    _max: VeiculoMaxAggregateOutputType | null
  }

  export type VeiculoAvgAggregateOutputType = {
    id: number | null
    v_cod_id: number | null
    v_modelo_id: number | null
    v_fabricante_id: number | null
    c_cliente_id: number | null
  }

  export type VeiculoSumAggregateOutputType = {
    id: number | null
    v_cod_id: number | null
    v_modelo_id: number | null
    v_fabricante_id: number | null
    c_cliente_id: number | null
  }

  export type VeiculoMinAggregateOutputType = {
    id: number | null
    placa: string | null
    v_cod_id: number | null
    v_modelo_id: number | null
    v_fabricante_id: number | null
    c_cliente_id: number | null
    data: Date | null
  }

  export type VeiculoMaxAggregateOutputType = {
    id: number | null
    placa: string | null
    v_cod_id: number | null
    v_modelo_id: number | null
    v_fabricante_id: number | null
    c_cliente_id: number | null
    data: Date | null
  }

  export type VeiculoCountAggregateOutputType = {
    id: number
    placa: number
    v_cod_id: number
    v_modelo_id: number
    v_fabricante_id: number
    c_cliente_id: number
    data: number
    _all: number
  }


  export type VeiculoAvgAggregateInputType = {
    id?: true
    v_cod_id?: true
    v_modelo_id?: true
    v_fabricante_id?: true
    c_cliente_id?: true
  }

  export type VeiculoSumAggregateInputType = {
    id?: true
    v_cod_id?: true
    v_modelo_id?: true
    v_fabricante_id?: true
    c_cliente_id?: true
  }

  export type VeiculoMinAggregateInputType = {
    id?: true
    placa?: true
    v_cod_id?: true
    v_modelo_id?: true
    v_fabricante_id?: true
    c_cliente_id?: true
    data?: true
  }

  export type VeiculoMaxAggregateInputType = {
    id?: true
    placa?: true
    v_cod_id?: true
    v_modelo_id?: true
    v_fabricante_id?: true
    c_cliente_id?: true
    data?: true
  }

  export type VeiculoCountAggregateInputType = {
    id?: true
    placa?: true
    v_cod_id?: true
    v_modelo_id?: true
    v_fabricante_id?: true
    c_cliente_id?: true
    data?: true
    _all?: true
  }

  export type VeiculoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Veiculo to aggregate.
     */
    where?: VeiculoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Veiculos to fetch.
     */
    orderBy?: VeiculoOrderByWithRelationInput | VeiculoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VeiculoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Veiculos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Veiculos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Veiculos
    **/
    _count?: true | VeiculoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VeiculoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VeiculoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VeiculoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VeiculoMaxAggregateInputType
  }

  export type GetVeiculoAggregateType<T extends VeiculoAggregateArgs> = {
        [P in keyof T & keyof AggregateVeiculo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVeiculo[P]>
      : GetScalarType<T[P], AggregateVeiculo[P]>
  }




  export type VeiculoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VeiculoWhereInput
    orderBy?: VeiculoOrderByWithAggregationInput | VeiculoOrderByWithAggregationInput[]
    by: VeiculoScalarFieldEnum[] | VeiculoScalarFieldEnum
    having?: VeiculoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VeiculoCountAggregateInputType | true
    _avg?: VeiculoAvgAggregateInputType
    _sum?: VeiculoSumAggregateInputType
    _min?: VeiculoMinAggregateInputType
    _max?: VeiculoMaxAggregateInputType
  }

  export type VeiculoGroupByOutputType = {
    id: number
    placa: string
    v_cod_id: number
    v_modelo_id: number
    v_fabricante_id: number
    c_cliente_id: number
    data: Date
    _count: VeiculoCountAggregateOutputType | null
    _avg: VeiculoAvgAggregateOutputType | null
    _sum: VeiculoSumAggregateOutputType | null
    _min: VeiculoMinAggregateOutputType | null
    _max: VeiculoMaxAggregateOutputType | null
  }

  type GetVeiculoGroupByPayload<T extends VeiculoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VeiculoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VeiculoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VeiculoGroupByOutputType[P]>
            : GetScalarType<T[P], VeiculoGroupByOutputType[P]>
        }
      >
    >


  export type VeiculoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    placa?: boolean
    v_cod_id?: boolean
    v_modelo_id?: boolean
    v_fabricante_id?: boolean
    c_cliente_id?: boolean
    data?: boolean
  }, ExtArgs["result"]["veiculo"]>

  export type VeiculoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    placa?: boolean
    v_cod_id?: boolean
    v_modelo_id?: boolean
    v_fabricante_id?: boolean
    c_cliente_id?: boolean
    data?: boolean
  }, ExtArgs["result"]["veiculo"]>

  export type VeiculoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    placa?: boolean
    v_cod_id?: boolean
    v_modelo_id?: boolean
    v_fabricante_id?: boolean
    c_cliente_id?: boolean
    data?: boolean
  }, ExtArgs["result"]["veiculo"]>

  export type VeiculoSelectScalar = {
    id?: boolean
    placa?: boolean
    v_cod_id?: boolean
    v_modelo_id?: boolean
    v_fabricante_id?: boolean
    c_cliente_id?: boolean
    data?: boolean
  }

  export type VeiculoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "placa" | "v_cod_id" | "v_modelo_id" | "v_fabricante_id" | "c_cliente_id" | "data", ExtArgs["result"]["veiculo"]>

  export type $VeiculoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Veiculo"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      placa: string
      v_cod_id: number
      v_modelo_id: number
      v_fabricante_id: number
      c_cliente_id: number
      data: Date
    }, ExtArgs["result"]["veiculo"]>
    composites: {}
  }

  type VeiculoGetPayload<S extends boolean | null | undefined | VeiculoDefaultArgs> = $Result.GetResult<Prisma.$VeiculoPayload, S>

  type VeiculoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VeiculoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VeiculoCountAggregateInputType | true
    }

  export interface VeiculoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Veiculo'], meta: { name: 'Veiculo' } }
    /**
     * Find zero or one Veiculo that matches the filter.
     * @param {VeiculoFindUniqueArgs} args - Arguments to find a Veiculo
     * @example
     * // Get one Veiculo
     * const veiculo = await prisma.veiculo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VeiculoFindUniqueArgs>(args: SelectSubset<T, VeiculoFindUniqueArgs<ExtArgs>>): Prisma__VeiculoClient<$Result.GetResult<Prisma.$VeiculoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Veiculo that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VeiculoFindUniqueOrThrowArgs} args - Arguments to find a Veiculo
     * @example
     * // Get one Veiculo
     * const veiculo = await prisma.veiculo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VeiculoFindUniqueOrThrowArgs>(args: SelectSubset<T, VeiculoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VeiculoClient<$Result.GetResult<Prisma.$VeiculoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Veiculo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VeiculoFindFirstArgs} args - Arguments to find a Veiculo
     * @example
     * // Get one Veiculo
     * const veiculo = await prisma.veiculo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VeiculoFindFirstArgs>(args?: SelectSubset<T, VeiculoFindFirstArgs<ExtArgs>>): Prisma__VeiculoClient<$Result.GetResult<Prisma.$VeiculoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Veiculo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VeiculoFindFirstOrThrowArgs} args - Arguments to find a Veiculo
     * @example
     * // Get one Veiculo
     * const veiculo = await prisma.veiculo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VeiculoFindFirstOrThrowArgs>(args?: SelectSubset<T, VeiculoFindFirstOrThrowArgs<ExtArgs>>): Prisma__VeiculoClient<$Result.GetResult<Prisma.$VeiculoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Veiculos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VeiculoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Veiculos
     * const veiculos = await prisma.veiculo.findMany()
     * 
     * // Get first 10 Veiculos
     * const veiculos = await prisma.veiculo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const veiculoWithIdOnly = await prisma.veiculo.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VeiculoFindManyArgs>(args?: SelectSubset<T, VeiculoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VeiculoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Veiculo.
     * @param {VeiculoCreateArgs} args - Arguments to create a Veiculo.
     * @example
     * // Create one Veiculo
     * const Veiculo = await prisma.veiculo.create({
     *   data: {
     *     // ... data to create a Veiculo
     *   }
     * })
     * 
     */
    create<T extends VeiculoCreateArgs>(args: SelectSubset<T, VeiculoCreateArgs<ExtArgs>>): Prisma__VeiculoClient<$Result.GetResult<Prisma.$VeiculoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Veiculos.
     * @param {VeiculoCreateManyArgs} args - Arguments to create many Veiculos.
     * @example
     * // Create many Veiculos
     * const veiculo = await prisma.veiculo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VeiculoCreateManyArgs>(args?: SelectSubset<T, VeiculoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Veiculos and returns the data saved in the database.
     * @param {VeiculoCreateManyAndReturnArgs} args - Arguments to create many Veiculos.
     * @example
     * // Create many Veiculos
     * const veiculo = await prisma.veiculo.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Veiculos and only return the `id`
     * const veiculoWithIdOnly = await prisma.veiculo.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VeiculoCreateManyAndReturnArgs>(args?: SelectSubset<T, VeiculoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VeiculoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Veiculo.
     * @param {VeiculoDeleteArgs} args - Arguments to delete one Veiculo.
     * @example
     * // Delete one Veiculo
     * const Veiculo = await prisma.veiculo.delete({
     *   where: {
     *     // ... filter to delete one Veiculo
     *   }
     * })
     * 
     */
    delete<T extends VeiculoDeleteArgs>(args: SelectSubset<T, VeiculoDeleteArgs<ExtArgs>>): Prisma__VeiculoClient<$Result.GetResult<Prisma.$VeiculoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Veiculo.
     * @param {VeiculoUpdateArgs} args - Arguments to update one Veiculo.
     * @example
     * // Update one Veiculo
     * const veiculo = await prisma.veiculo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VeiculoUpdateArgs>(args: SelectSubset<T, VeiculoUpdateArgs<ExtArgs>>): Prisma__VeiculoClient<$Result.GetResult<Prisma.$VeiculoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Veiculos.
     * @param {VeiculoDeleteManyArgs} args - Arguments to filter Veiculos to delete.
     * @example
     * // Delete a few Veiculos
     * const { count } = await prisma.veiculo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VeiculoDeleteManyArgs>(args?: SelectSubset<T, VeiculoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Veiculos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VeiculoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Veiculos
     * const veiculo = await prisma.veiculo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VeiculoUpdateManyArgs>(args: SelectSubset<T, VeiculoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Veiculos and returns the data updated in the database.
     * @param {VeiculoUpdateManyAndReturnArgs} args - Arguments to update many Veiculos.
     * @example
     * // Update many Veiculos
     * const veiculo = await prisma.veiculo.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Veiculos and only return the `id`
     * const veiculoWithIdOnly = await prisma.veiculo.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VeiculoUpdateManyAndReturnArgs>(args: SelectSubset<T, VeiculoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VeiculoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Veiculo.
     * @param {VeiculoUpsertArgs} args - Arguments to update or create a Veiculo.
     * @example
     * // Update or create a Veiculo
     * const veiculo = await prisma.veiculo.upsert({
     *   create: {
     *     // ... data to create a Veiculo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Veiculo we want to update
     *   }
     * })
     */
    upsert<T extends VeiculoUpsertArgs>(args: SelectSubset<T, VeiculoUpsertArgs<ExtArgs>>): Prisma__VeiculoClient<$Result.GetResult<Prisma.$VeiculoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Veiculos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VeiculoCountArgs} args - Arguments to filter Veiculos to count.
     * @example
     * // Count the number of Veiculos
     * const count = await prisma.veiculo.count({
     *   where: {
     *     // ... the filter for the Veiculos we want to count
     *   }
     * })
    **/
    count<T extends VeiculoCountArgs>(
      args?: Subset<T, VeiculoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VeiculoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Veiculo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VeiculoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VeiculoAggregateArgs>(args: Subset<T, VeiculoAggregateArgs>): Prisma.PrismaPromise<GetVeiculoAggregateType<T>>

    /**
     * Group by Veiculo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VeiculoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VeiculoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VeiculoGroupByArgs['orderBy'] }
        : { orderBy?: VeiculoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VeiculoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVeiculoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Veiculo model
   */
  readonly fields: VeiculoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Veiculo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VeiculoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Veiculo model
   */
  interface VeiculoFieldRefs {
    readonly id: FieldRef<"Veiculo", 'Int'>
    readonly placa: FieldRef<"Veiculo", 'String'>
    readonly v_cod_id: FieldRef<"Veiculo", 'Int'>
    readonly v_modelo_id: FieldRef<"Veiculo", 'Int'>
    readonly v_fabricante_id: FieldRef<"Veiculo", 'Int'>
    readonly c_cliente_id: FieldRef<"Veiculo", 'Int'>
    readonly data: FieldRef<"Veiculo", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Veiculo findUnique
   */
  export type VeiculoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Veiculo
     */
    select?: VeiculoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Veiculo
     */
    omit?: VeiculoOmit<ExtArgs> | null
    /**
     * Filter, which Veiculo to fetch.
     */
    where: VeiculoWhereUniqueInput
  }

  /**
   * Veiculo findUniqueOrThrow
   */
  export type VeiculoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Veiculo
     */
    select?: VeiculoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Veiculo
     */
    omit?: VeiculoOmit<ExtArgs> | null
    /**
     * Filter, which Veiculo to fetch.
     */
    where: VeiculoWhereUniqueInput
  }

  /**
   * Veiculo findFirst
   */
  export type VeiculoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Veiculo
     */
    select?: VeiculoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Veiculo
     */
    omit?: VeiculoOmit<ExtArgs> | null
    /**
     * Filter, which Veiculo to fetch.
     */
    where?: VeiculoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Veiculos to fetch.
     */
    orderBy?: VeiculoOrderByWithRelationInput | VeiculoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Veiculos.
     */
    cursor?: VeiculoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Veiculos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Veiculos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Veiculos.
     */
    distinct?: VeiculoScalarFieldEnum | VeiculoScalarFieldEnum[]
  }

  /**
   * Veiculo findFirstOrThrow
   */
  export type VeiculoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Veiculo
     */
    select?: VeiculoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Veiculo
     */
    omit?: VeiculoOmit<ExtArgs> | null
    /**
     * Filter, which Veiculo to fetch.
     */
    where?: VeiculoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Veiculos to fetch.
     */
    orderBy?: VeiculoOrderByWithRelationInput | VeiculoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Veiculos.
     */
    cursor?: VeiculoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Veiculos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Veiculos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Veiculos.
     */
    distinct?: VeiculoScalarFieldEnum | VeiculoScalarFieldEnum[]
  }

  /**
   * Veiculo findMany
   */
  export type VeiculoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Veiculo
     */
    select?: VeiculoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Veiculo
     */
    omit?: VeiculoOmit<ExtArgs> | null
    /**
     * Filter, which Veiculos to fetch.
     */
    where?: VeiculoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Veiculos to fetch.
     */
    orderBy?: VeiculoOrderByWithRelationInput | VeiculoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Veiculos.
     */
    cursor?: VeiculoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Veiculos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Veiculos.
     */
    skip?: number
    distinct?: VeiculoScalarFieldEnum | VeiculoScalarFieldEnum[]
  }

  /**
   * Veiculo create
   */
  export type VeiculoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Veiculo
     */
    select?: VeiculoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Veiculo
     */
    omit?: VeiculoOmit<ExtArgs> | null
    /**
     * The data needed to create a Veiculo.
     */
    data: XOR<VeiculoCreateInput, VeiculoUncheckedCreateInput>
  }

  /**
   * Veiculo createMany
   */
  export type VeiculoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Veiculos.
     */
    data: VeiculoCreateManyInput | VeiculoCreateManyInput[]
  }

  /**
   * Veiculo createManyAndReturn
   */
  export type VeiculoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Veiculo
     */
    select?: VeiculoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Veiculo
     */
    omit?: VeiculoOmit<ExtArgs> | null
    /**
     * The data used to create many Veiculos.
     */
    data: VeiculoCreateManyInput | VeiculoCreateManyInput[]
  }

  /**
   * Veiculo update
   */
  export type VeiculoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Veiculo
     */
    select?: VeiculoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Veiculo
     */
    omit?: VeiculoOmit<ExtArgs> | null
    /**
     * The data needed to update a Veiculo.
     */
    data: XOR<VeiculoUpdateInput, VeiculoUncheckedUpdateInput>
    /**
     * Choose, which Veiculo to update.
     */
    where: VeiculoWhereUniqueInput
  }

  /**
   * Veiculo updateMany
   */
  export type VeiculoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Veiculos.
     */
    data: XOR<VeiculoUpdateManyMutationInput, VeiculoUncheckedUpdateManyInput>
    /**
     * Filter which Veiculos to update
     */
    where?: VeiculoWhereInput
    /**
     * Limit how many Veiculos to update.
     */
    limit?: number
  }

  /**
   * Veiculo updateManyAndReturn
   */
  export type VeiculoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Veiculo
     */
    select?: VeiculoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Veiculo
     */
    omit?: VeiculoOmit<ExtArgs> | null
    /**
     * The data used to update Veiculos.
     */
    data: XOR<VeiculoUpdateManyMutationInput, VeiculoUncheckedUpdateManyInput>
    /**
     * Filter which Veiculos to update
     */
    where?: VeiculoWhereInput
    /**
     * Limit how many Veiculos to update.
     */
    limit?: number
  }

  /**
   * Veiculo upsert
   */
  export type VeiculoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Veiculo
     */
    select?: VeiculoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Veiculo
     */
    omit?: VeiculoOmit<ExtArgs> | null
    /**
     * The filter to search for the Veiculo to update in case it exists.
     */
    where: VeiculoWhereUniqueInput
    /**
     * In case the Veiculo found by the `where` argument doesn't exist, create a new Veiculo with this data.
     */
    create: XOR<VeiculoCreateInput, VeiculoUncheckedCreateInput>
    /**
     * In case the Veiculo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VeiculoUpdateInput, VeiculoUncheckedUpdateInput>
  }

  /**
   * Veiculo delete
   */
  export type VeiculoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Veiculo
     */
    select?: VeiculoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Veiculo
     */
    omit?: VeiculoOmit<ExtArgs> | null
    /**
     * Filter which Veiculo to delete.
     */
    where: VeiculoWhereUniqueInput
  }

  /**
   * Veiculo deleteMany
   */
  export type VeiculoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Veiculos to delete
     */
    where?: VeiculoWhereInput
    /**
     * Limit how many Veiculos to delete.
     */
    limit?: number
  }

  /**
   * Veiculo without action
   */
  export type VeiculoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Veiculo
     */
    select?: VeiculoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Veiculo
     */
    omit?: VeiculoOmit<ExtArgs> | null
  }


  /**
   * Model Modelo
   */

  export type AggregateModelo = {
    _count: ModeloCountAggregateOutputType | null
    _avg: ModeloAvgAggregateOutputType | null
    _sum: ModeloSumAggregateOutputType | null
    _min: ModeloMinAggregateOutputType | null
    _max: ModeloMaxAggregateOutputType | null
  }

  export type ModeloAvgAggregateOutputType = {
    id: number | null
  }

  export type ModeloSumAggregateOutputType = {
    id: number | null
  }

  export type ModeloMinAggregateOutputType = {
    id: number | null
    descricao: string | null
    data: Date | null
  }

  export type ModeloMaxAggregateOutputType = {
    id: number | null
    descricao: string | null
    data: Date | null
  }

  export type ModeloCountAggregateOutputType = {
    id: number
    descricao: number
    data: number
    _all: number
  }


  export type ModeloAvgAggregateInputType = {
    id?: true
  }

  export type ModeloSumAggregateInputType = {
    id?: true
  }

  export type ModeloMinAggregateInputType = {
    id?: true
    descricao?: true
    data?: true
  }

  export type ModeloMaxAggregateInputType = {
    id?: true
    descricao?: true
    data?: true
  }

  export type ModeloCountAggregateInputType = {
    id?: true
    descricao?: true
    data?: true
    _all?: true
  }

  export type ModeloAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Modelo to aggregate.
     */
    where?: ModeloWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Modelos to fetch.
     */
    orderBy?: ModeloOrderByWithRelationInput | ModeloOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ModeloWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Modelos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Modelos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Modelos
    **/
    _count?: true | ModeloCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ModeloAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ModeloSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ModeloMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ModeloMaxAggregateInputType
  }

  export type GetModeloAggregateType<T extends ModeloAggregateArgs> = {
        [P in keyof T & keyof AggregateModelo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateModelo[P]>
      : GetScalarType<T[P], AggregateModelo[P]>
  }




  export type ModeloGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ModeloWhereInput
    orderBy?: ModeloOrderByWithAggregationInput | ModeloOrderByWithAggregationInput[]
    by: ModeloScalarFieldEnum[] | ModeloScalarFieldEnum
    having?: ModeloScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ModeloCountAggregateInputType | true
    _avg?: ModeloAvgAggregateInputType
    _sum?: ModeloSumAggregateInputType
    _min?: ModeloMinAggregateInputType
    _max?: ModeloMaxAggregateInputType
  }

  export type ModeloGroupByOutputType = {
    id: number
    descricao: string
    data: Date
    _count: ModeloCountAggregateOutputType | null
    _avg: ModeloAvgAggregateOutputType | null
    _sum: ModeloSumAggregateOutputType | null
    _min: ModeloMinAggregateOutputType | null
    _max: ModeloMaxAggregateOutputType | null
  }

  type GetModeloGroupByPayload<T extends ModeloGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ModeloGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ModeloGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ModeloGroupByOutputType[P]>
            : GetScalarType<T[P], ModeloGroupByOutputType[P]>
        }
      >
    >


  export type ModeloSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    descricao?: boolean
    data?: boolean
  }, ExtArgs["result"]["modelo"]>

  export type ModeloSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    descricao?: boolean
    data?: boolean
  }, ExtArgs["result"]["modelo"]>

  export type ModeloSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    descricao?: boolean
    data?: boolean
  }, ExtArgs["result"]["modelo"]>

  export type ModeloSelectScalar = {
    id?: boolean
    descricao?: boolean
    data?: boolean
  }

  export type ModeloOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "descricao" | "data", ExtArgs["result"]["modelo"]>

  export type $ModeloPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Modelo"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      descricao: string
      data: Date
    }, ExtArgs["result"]["modelo"]>
    composites: {}
  }

  type ModeloGetPayload<S extends boolean | null | undefined | ModeloDefaultArgs> = $Result.GetResult<Prisma.$ModeloPayload, S>

  type ModeloCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ModeloFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ModeloCountAggregateInputType | true
    }

  export interface ModeloDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Modelo'], meta: { name: 'Modelo' } }
    /**
     * Find zero or one Modelo that matches the filter.
     * @param {ModeloFindUniqueArgs} args - Arguments to find a Modelo
     * @example
     * // Get one Modelo
     * const modelo = await prisma.modelo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ModeloFindUniqueArgs>(args: SelectSubset<T, ModeloFindUniqueArgs<ExtArgs>>): Prisma__ModeloClient<$Result.GetResult<Prisma.$ModeloPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Modelo that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ModeloFindUniqueOrThrowArgs} args - Arguments to find a Modelo
     * @example
     * // Get one Modelo
     * const modelo = await prisma.modelo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ModeloFindUniqueOrThrowArgs>(args: SelectSubset<T, ModeloFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ModeloClient<$Result.GetResult<Prisma.$ModeloPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Modelo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModeloFindFirstArgs} args - Arguments to find a Modelo
     * @example
     * // Get one Modelo
     * const modelo = await prisma.modelo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ModeloFindFirstArgs>(args?: SelectSubset<T, ModeloFindFirstArgs<ExtArgs>>): Prisma__ModeloClient<$Result.GetResult<Prisma.$ModeloPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Modelo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModeloFindFirstOrThrowArgs} args - Arguments to find a Modelo
     * @example
     * // Get one Modelo
     * const modelo = await prisma.modelo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ModeloFindFirstOrThrowArgs>(args?: SelectSubset<T, ModeloFindFirstOrThrowArgs<ExtArgs>>): Prisma__ModeloClient<$Result.GetResult<Prisma.$ModeloPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Modelos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModeloFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Modelos
     * const modelos = await prisma.modelo.findMany()
     * 
     * // Get first 10 Modelos
     * const modelos = await prisma.modelo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const modeloWithIdOnly = await prisma.modelo.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ModeloFindManyArgs>(args?: SelectSubset<T, ModeloFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModeloPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Modelo.
     * @param {ModeloCreateArgs} args - Arguments to create a Modelo.
     * @example
     * // Create one Modelo
     * const Modelo = await prisma.modelo.create({
     *   data: {
     *     // ... data to create a Modelo
     *   }
     * })
     * 
     */
    create<T extends ModeloCreateArgs>(args: SelectSubset<T, ModeloCreateArgs<ExtArgs>>): Prisma__ModeloClient<$Result.GetResult<Prisma.$ModeloPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Modelos.
     * @param {ModeloCreateManyArgs} args - Arguments to create many Modelos.
     * @example
     * // Create many Modelos
     * const modelo = await prisma.modelo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ModeloCreateManyArgs>(args?: SelectSubset<T, ModeloCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Modelos and returns the data saved in the database.
     * @param {ModeloCreateManyAndReturnArgs} args - Arguments to create many Modelos.
     * @example
     * // Create many Modelos
     * const modelo = await prisma.modelo.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Modelos and only return the `id`
     * const modeloWithIdOnly = await prisma.modelo.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ModeloCreateManyAndReturnArgs>(args?: SelectSubset<T, ModeloCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModeloPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Modelo.
     * @param {ModeloDeleteArgs} args - Arguments to delete one Modelo.
     * @example
     * // Delete one Modelo
     * const Modelo = await prisma.modelo.delete({
     *   where: {
     *     // ... filter to delete one Modelo
     *   }
     * })
     * 
     */
    delete<T extends ModeloDeleteArgs>(args: SelectSubset<T, ModeloDeleteArgs<ExtArgs>>): Prisma__ModeloClient<$Result.GetResult<Prisma.$ModeloPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Modelo.
     * @param {ModeloUpdateArgs} args - Arguments to update one Modelo.
     * @example
     * // Update one Modelo
     * const modelo = await prisma.modelo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ModeloUpdateArgs>(args: SelectSubset<T, ModeloUpdateArgs<ExtArgs>>): Prisma__ModeloClient<$Result.GetResult<Prisma.$ModeloPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Modelos.
     * @param {ModeloDeleteManyArgs} args - Arguments to filter Modelos to delete.
     * @example
     * // Delete a few Modelos
     * const { count } = await prisma.modelo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ModeloDeleteManyArgs>(args?: SelectSubset<T, ModeloDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Modelos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModeloUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Modelos
     * const modelo = await prisma.modelo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ModeloUpdateManyArgs>(args: SelectSubset<T, ModeloUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Modelos and returns the data updated in the database.
     * @param {ModeloUpdateManyAndReturnArgs} args - Arguments to update many Modelos.
     * @example
     * // Update many Modelos
     * const modelo = await prisma.modelo.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Modelos and only return the `id`
     * const modeloWithIdOnly = await prisma.modelo.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ModeloUpdateManyAndReturnArgs>(args: SelectSubset<T, ModeloUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModeloPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Modelo.
     * @param {ModeloUpsertArgs} args - Arguments to update or create a Modelo.
     * @example
     * // Update or create a Modelo
     * const modelo = await prisma.modelo.upsert({
     *   create: {
     *     // ... data to create a Modelo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Modelo we want to update
     *   }
     * })
     */
    upsert<T extends ModeloUpsertArgs>(args: SelectSubset<T, ModeloUpsertArgs<ExtArgs>>): Prisma__ModeloClient<$Result.GetResult<Prisma.$ModeloPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Modelos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModeloCountArgs} args - Arguments to filter Modelos to count.
     * @example
     * // Count the number of Modelos
     * const count = await prisma.modelo.count({
     *   where: {
     *     // ... the filter for the Modelos we want to count
     *   }
     * })
    **/
    count<T extends ModeloCountArgs>(
      args?: Subset<T, ModeloCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ModeloCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Modelo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModeloAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ModeloAggregateArgs>(args: Subset<T, ModeloAggregateArgs>): Prisma.PrismaPromise<GetModeloAggregateType<T>>

    /**
     * Group by Modelo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModeloGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ModeloGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ModeloGroupByArgs['orderBy'] }
        : { orderBy?: ModeloGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ModeloGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetModeloGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Modelo model
   */
  readonly fields: ModeloFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Modelo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ModeloClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Modelo model
   */
  interface ModeloFieldRefs {
    readonly id: FieldRef<"Modelo", 'Int'>
    readonly descricao: FieldRef<"Modelo", 'String'>
    readonly data: FieldRef<"Modelo", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Modelo findUnique
   */
  export type ModeloFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Modelo
     */
    select?: ModeloSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Modelo
     */
    omit?: ModeloOmit<ExtArgs> | null
    /**
     * Filter, which Modelo to fetch.
     */
    where: ModeloWhereUniqueInput
  }

  /**
   * Modelo findUniqueOrThrow
   */
  export type ModeloFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Modelo
     */
    select?: ModeloSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Modelo
     */
    omit?: ModeloOmit<ExtArgs> | null
    /**
     * Filter, which Modelo to fetch.
     */
    where: ModeloWhereUniqueInput
  }

  /**
   * Modelo findFirst
   */
  export type ModeloFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Modelo
     */
    select?: ModeloSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Modelo
     */
    omit?: ModeloOmit<ExtArgs> | null
    /**
     * Filter, which Modelo to fetch.
     */
    where?: ModeloWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Modelos to fetch.
     */
    orderBy?: ModeloOrderByWithRelationInput | ModeloOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Modelos.
     */
    cursor?: ModeloWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Modelos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Modelos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Modelos.
     */
    distinct?: ModeloScalarFieldEnum | ModeloScalarFieldEnum[]
  }

  /**
   * Modelo findFirstOrThrow
   */
  export type ModeloFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Modelo
     */
    select?: ModeloSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Modelo
     */
    omit?: ModeloOmit<ExtArgs> | null
    /**
     * Filter, which Modelo to fetch.
     */
    where?: ModeloWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Modelos to fetch.
     */
    orderBy?: ModeloOrderByWithRelationInput | ModeloOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Modelos.
     */
    cursor?: ModeloWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Modelos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Modelos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Modelos.
     */
    distinct?: ModeloScalarFieldEnum | ModeloScalarFieldEnum[]
  }

  /**
   * Modelo findMany
   */
  export type ModeloFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Modelo
     */
    select?: ModeloSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Modelo
     */
    omit?: ModeloOmit<ExtArgs> | null
    /**
     * Filter, which Modelos to fetch.
     */
    where?: ModeloWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Modelos to fetch.
     */
    orderBy?: ModeloOrderByWithRelationInput | ModeloOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Modelos.
     */
    cursor?: ModeloWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Modelos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Modelos.
     */
    skip?: number
    distinct?: ModeloScalarFieldEnum | ModeloScalarFieldEnum[]
  }

  /**
   * Modelo create
   */
  export type ModeloCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Modelo
     */
    select?: ModeloSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Modelo
     */
    omit?: ModeloOmit<ExtArgs> | null
    /**
     * The data needed to create a Modelo.
     */
    data: XOR<ModeloCreateInput, ModeloUncheckedCreateInput>
  }

  /**
   * Modelo createMany
   */
  export type ModeloCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Modelos.
     */
    data: ModeloCreateManyInput | ModeloCreateManyInput[]
  }

  /**
   * Modelo createManyAndReturn
   */
  export type ModeloCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Modelo
     */
    select?: ModeloSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Modelo
     */
    omit?: ModeloOmit<ExtArgs> | null
    /**
     * The data used to create many Modelos.
     */
    data: ModeloCreateManyInput | ModeloCreateManyInput[]
  }

  /**
   * Modelo update
   */
  export type ModeloUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Modelo
     */
    select?: ModeloSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Modelo
     */
    omit?: ModeloOmit<ExtArgs> | null
    /**
     * The data needed to update a Modelo.
     */
    data: XOR<ModeloUpdateInput, ModeloUncheckedUpdateInput>
    /**
     * Choose, which Modelo to update.
     */
    where: ModeloWhereUniqueInput
  }

  /**
   * Modelo updateMany
   */
  export type ModeloUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Modelos.
     */
    data: XOR<ModeloUpdateManyMutationInput, ModeloUncheckedUpdateManyInput>
    /**
     * Filter which Modelos to update
     */
    where?: ModeloWhereInput
    /**
     * Limit how many Modelos to update.
     */
    limit?: number
  }

  /**
   * Modelo updateManyAndReturn
   */
  export type ModeloUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Modelo
     */
    select?: ModeloSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Modelo
     */
    omit?: ModeloOmit<ExtArgs> | null
    /**
     * The data used to update Modelos.
     */
    data: XOR<ModeloUpdateManyMutationInput, ModeloUncheckedUpdateManyInput>
    /**
     * Filter which Modelos to update
     */
    where?: ModeloWhereInput
    /**
     * Limit how many Modelos to update.
     */
    limit?: number
  }

  /**
   * Modelo upsert
   */
  export type ModeloUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Modelo
     */
    select?: ModeloSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Modelo
     */
    omit?: ModeloOmit<ExtArgs> | null
    /**
     * The filter to search for the Modelo to update in case it exists.
     */
    where: ModeloWhereUniqueInput
    /**
     * In case the Modelo found by the `where` argument doesn't exist, create a new Modelo with this data.
     */
    create: XOR<ModeloCreateInput, ModeloUncheckedCreateInput>
    /**
     * In case the Modelo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ModeloUpdateInput, ModeloUncheckedUpdateInput>
  }

  /**
   * Modelo delete
   */
  export type ModeloDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Modelo
     */
    select?: ModeloSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Modelo
     */
    omit?: ModeloOmit<ExtArgs> | null
    /**
     * Filter which Modelo to delete.
     */
    where: ModeloWhereUniqueInput
  }

  /**
   * Modelo deleteMany
   */
  export type ModeloDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Modelos to delete
     */
    where?: ModeloWhereInput
    /**
     * Limit how many Modelos to delete.
     */
    limit?: number
  }

  /**
   * Modelo without action
   */
  export type ModeloDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Modelo
     */
    select?: ModeloSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Modelo
     */
    omit?: ModeloOmit<ExtArgs> | null
  }


  /**
   * Model Cor
   */

  export type AggregateCor = {
    _count: CorCountAggregateOutputType | null
    _avg: CorAvgAggregateOutputType | null
    _sum: CorSumAggregateOutputType | null
    _min: CorMinAggregateOutputType | null
    _max: CorMaxAggregateOutputType | null
  }

  export type CorAvgAggregateOutputType = {
    id: number | null
  }

  export type CorSumAggregateOutputType = {
    id: number | null
  }

  export type CorMinAggregateOutputType = {
    id: number | null
    descricao: string | null
    data: Date | null
  }

  export type CorMaxAggregateOutputType = {
    id: number | null
    descricao: string | null
    data: Date | null
  }

  export type CorCountAggregateOutputType = {
    id: number
    descricao: number
    data: number
    _all: number
  }


  export type CorAvgAggregateInputType = {
    id?: true
  }

  export type CorSumAggregateInputType = {
    id?: true
  }

  export type CorMinAggregateInputType = {
    id?: true
    descricao?: true
    data?: true
  }

  export type CorMaxAggregateInputType = {
    id?: true
    descricao?: true
    data?: true
  }

  export type CorCountAggregateInputType = {
    id?: true
    descricao?: true
    data?: true
    _all?: true
  }

  export type CorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Cor to aggregate.
     */
    where?: CorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cors to fetch.
     */
    orderBy?: CorOrderByWithRelationInput | CorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Cors
    **/
    _count?: true | CorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CorAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CorSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CorMaxAggregateInputType
  }

  export type GetCorAggregateType<T extends CorAggregateArgs> = {
        [P in keyof T & keyof AggregateCor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCor[P]>
      : GetScalarType<T[P], AggregateCor[P]>
  }




  export type CorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CorWhereInput
    orderBy?: CorOrderByWithAggregationInput | CorOrderByWithAggregationInput[]
    by: CorScalarFieldEnum[] | CorScalarFieldEnum
    having?: CorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CorCountAggregateInputType | true
    _avg?: CorAvgAggregateInputType
    _sum?: CorSumAggregateInputType
    _min?: CorMinAggregateInputType
    _max?: CorMaxAggregateInputType
  }

  export type CorGroupByOutputType = {
    id: number
    descricao: string
    data: Date
    _count: CorCountAggregateOutputType | null
    _avg: CorAvgAggregateOutputType | null
    _sum: CorSumAggregateOutputType | null
    _min: CorMinAggregateOutputType | null
    _max: CorMaxAggregateOutputType | null
  }

  type GetCorGroupByPayload<T extends CorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CorGroupByOutputType[P]>
            : GetScalarType<T[P], CorGroupByOutputType[P]>
        }
      >
    >


  export type CorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    descricao?: boolean
    data?: boolean
  }, ExtArgs["result"]["cor"]>

  export type CorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    descricao?: boolean
    data?: boolean
  }, ExtArgs["result"]["cor"]>

  export type CorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    descricao?: boolean
    data?: boolean
  }, ExtArgs["result"]["cor"]>

  export type CorSelectScalar = {
    id?: boolean
    descricao?: boolean
    data?: boolean
  }

  export type CorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "descricao" | "data", ExtArgs["result"]["cor"]>

  export type $CorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Cor"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      descricao: string
      data: Date
    }, ExtArgs["result"]["cor"]>
    composites: {}
  }

  type CorGetPayload<S extends boolean | null | undefined | CorDefaultArgs> = $Result.GetResult<Prisma.$CorPayload, S>

  type CorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CorCountAggregateInputType | true
    }

  export interface CorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Cor'], meta: { name: 'Cor' } }
    /**
     * Find zero or one Cor that matches the filter.
     * @param {CorFindUniqueArgs} args - Arguments to find a Cor
     * @example
     * // Get one Cor
     * const cor = await prisma.cor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CorFindUniqueArgs>(args: SelectSubset<T, CorFindUniqueArgs<ExtArgs>>): Prisma__CorClient<$Result.GetResult<Prisma.$CorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Cor that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CorFindUniqueOrThrowArgs} args - Arguments to find a Cor
     * @example
     * // Get one Cor
     * const cor = await prisma.cor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CorFindUniqueOrThrowArgs>(args: SelectSubset<T, CorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CorClient<$Result.GetResult<Prisma.$CorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Cor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CorFindFirstArgs} args - Arguments to find a Cor
     * @example
     * // Get one Cor
     * const cor = await prisma.cor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CorFindFirstArgs>(args?: SelectSubset<T, CorFindFirstArgs<ExtArgs>>): Prisma__CorClient<$Result.GetResult<Prisma.$CorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Cor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CorFindFirstOrThrowArgs} args - Arguments to find a Cor
     * @example
     * // Get one Cor
     * const cor = await prisma.cor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CorFindFirstOrThrowArgs>(args?: SelectSubset<T, CorFindFirstOrThrowArgs<ExtArgs>>): Prisma__CorClient<$Result.GetResult<Prisma.$CorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Cors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Cors
     * const cors = await prisma.cor.findMany()
     * 
     * // Get first 10 Cors
     * const cors = await prisma.cor.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const corWithIdOnly = await prisma.cor.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CorFindManyArgs>(args?: SelectSubset<T, CorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Cor.
     * @param {CorCreateArgs} args - Arguments to create a Cor.
     * @example
     * // Create one Cor
     * const Cor = await prisma.cor.create({
     *   data: {
     *     // ... data to create a Cor
     *   }
     * })
     * 
     */
    create<T extends CorCreateArgs>(args: SelectSubset<T, CorCreateArgs<ExtArgs>>): Prisma__CorClient<$Result.GetResult<Prisma.$CorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Cors.
     * @param {CorCreateManyArgs} args - Arguments to create many Cors.
     * @example
     * // Create many Cors
     * const cor = await prisma.cor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CorCreateManyArgs>(args?: SelectSubset<T, CorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Cors and returns the data saved in the database.
     * @param {CorCreateManyAndReturnArgs} args - Arguments to create many Cors.
     * @example
     * // Create many Cors
     * const cor = await prisma.cor.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Cors and only return the `id`
     * const corWithIdOnly = await prisma.cor.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CorCreateManyAndReturnArgs>(args?: SelectSubset<T, CorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Cor.
     * @param {CorDeleteArgs} args - Arguments to delete one Cor.
     * @example
     * // Delete one Cor
     * const Cor = await prisma.cor.delete({
     *   where: {
     *     // ... filter to delete one Cor
     *   }
     * })
     * 
     */
    delete<T extends CorDeleteArgs>(args: SelectSubset<T, CorDeleteArgs<ExtArgs>>): Prisma__CorClient<$Result.GetResult<Prisma.$CorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Cor.
     * @param {CorUpdateArgs} args - Arguments to update one Cor.
     * @example
     * // Update one Cor
     * const cor = await prisma.cor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CorUpdateArgs>(args: SelectSubset<T, CorUpdateArgs<ExtArgs>>): Prisma__CorClient<$Result.GetResult<Prisma.$CorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Cors.
     * @param {CorDeleteManyArgs} args - Arguments to filter Cors to delete.
     * @example
     * // Delete a few Cors
     * const { count } = await prisma.cor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CorDeleteManyArgs>(args?: SelectSubset<T, CorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Cors
     * const cor = await prisma.cor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CorUpdateManyArgs>(args: SelectSubset<T, CorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cors and returns the data updated in the database.
     * @param {CorUpdateManyAndReturnArgs} args - Arguments to update many Cors.
     * @example
     * // Update many Cors
     * const cor = await prisma.cor.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Cors and only return the `id`
     * const corWithIdOnly = await prisma.cor.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CorUpdateManyAndReturnArgs>(args: SelectSubset<T, CorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Cor.
     * @param {CorUpsertArgs} args - Arguments to update or create a Cor.
     * @example
     * // Update or create a Cor
     * const cor = await prisma.cor.upsert({
     *   create: {
     *     // ... data to create a Cor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Cor we want to update
     *   }
     * })
     */
    upsert<T extends CorUpsertArgs>(args: SelectSubset<T, CorUpsertArgs<ExtArgs>>): Prisma__CorClient<$Result.GetResult<Prisma.$CorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Cors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CorCountArgs} args - Arguments to filter Cors to count.
     * @example
     * // Count the number of Cors
     * const count = await prisma.cor.count({
     *   where: {
     *     // ... the filter for the Cors we want to count
     *   }
     * })
    **/
    count<T extends CorCountArgs>(
      args?: Subset<T, CorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Cor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CorAggregateArgs>(args: Subset<T, CorAggregateArgs>): Prisma.PrismaPromise<GetCorAggregateType<T>>

    /**
     * Group by Cor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CorGroupByArgs['orderBy'] }
        : { orderBy?: CorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Cor model
   */
  readonly fields: CorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Cor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Cor model
   */
  interface CorFieldRefs {
    readonly id: FieldRef<"Cor", 'Int'>
    readonly descricao: FieldRef<"Cor", 'String'>
    readonly data: FieldRef<"Cor", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Cor findUnique
   */
  export type CorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cor
     */
    select?: CorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cor
     */
    omit?: CorOmit<ExtArgs> | null
    /**
     * Filter, which Cor to fetch.
     */
    where: CorWhereUniqueInput
  }

  /**
   * Cor findUniqueOrThrow
   */
  export type CorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cor
     */
    select?: CorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cor
     */
    omit?: CorOmit<ExtArgs> | null
    /**
     * Filter, which Cor to fetch.
     */
    where: CorWhereUniqueInput
  }

  /**
   * Cor findFirst
   */
  export type CorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cor
     */
    select?: CorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cor
     */
    omit?: CorOmit<ExtArgs> | null
    /**
     * Filter, which Cor to fetch.
     */
    where?: CorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cors to fetch.
     */
    orderBy?: CorOrderByWithRelationInput | CorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Cors.
     */
    cursor?: CorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cors.
     */
    distinct?: CorScalarFieldEnum | CorScalarFieldEnum[]
  }

  /**
   * Cor findFirstOrThrow
   */
  export type CorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cor
     */
    select?: CorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cor
     */
    omit?: CorOmit<ExtArgs> | null
    /**
     * Filter, which Cor to fetch.
     */
    where?: CorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cors to fetch.
     */
    orderBy?: CorOrderByWithRelationInput | CorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Cors.
     */
    cursor?: CorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cors.
     */
    distinct?: CorScalarFieldEnum | CorScalarFieldEnum[]
  }

  /**
   * Cor findMany
   */
  export type CorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cor
     */
    select?: CorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cor
     */
    omit?: CorOmit<ExtArgs> | null
    /**
     * Filter, which Cors to fetch.
     */
    where?: CorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cors to fetch.
     */
    orderBy?: CorOrderByWithRelationInput | CorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Cors.
     */
    cursor?: CorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cors.
     */
    skip?: number
    distinct?: CorScalarFieldEnum | CorScalarFieldEnum[]
  }

  /**
   * Cor create
   */
  export type CorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cor
     */
    select?: CorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cor
     */
    omit?: CorOmit<ExtArgs> | null
    /**
     * The data needed to create a Cor.
     */
    data: XOR<CorCreateInput, CorUncheckedCreateInput>
  }

  /**
   * Cor createMany
   */
  export type CorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Cors.
     */
    data: CorCreateManyInput | CorCreateManyInput[]
  }

  /**
   * Cor createManyAndReturn
   */
  export type CorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cor
     */
    select?: CorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Cor
     */
    omit?: CorOmit<ExtArgs> | null
    /**
     * The data used to create many Cors.
     */
    data: CorCreateManyInput | CorCreateManyInput[]
  }

  /**
   * Cor update
   */
  export type CorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cor
     */
    select?: CorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cor
     */
    omit?: CorOmit<ExtArgs> | null
    /**
     * The data needed to update a Cor.
     */
    data: XOR<CorUpdateInput, CorUncheckedUpdateInput>
    /**
     * Choose, which Cor to update.
     */
    where: CorWhereUniqueInput
  }

  /**
   * Cor updateMany
   */
  export type CorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Cors.
     */
    data: XOR<CorUpdateManyMutationInput, CorUncheckedUpdateManyInput>
    /**
     * Filter which Cors to update
     */
    where?: CorWhereInput
    /**
     * Limit how many Cors to update.
     */
    limit?: number
  }

  /**
   * Cor updateManyAndReturn
   */
  export type CorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cor
     */
    select?: CorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Cor
     */
    omit?: CorOmit<ExtArgs> | null
    /**
     * The data used to update Cors.
     */
    data: XOR<CorUpdateManyMutationInput, CorUncheckedUpdateManyInput>
    /**
     * Filter which Cors to update
     */
    where?: CorWhereInput
    /**
     * Limit how many Cors to update.
     */
    limit?: number
  }

  /**
   * Cor upsert
   */
  export type CorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cor
     */
    select?: CorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cor
     */
    omit?: CorOmit<ExtArgs> | null
    /**
     * The filter to search for the Cor to update in case it exists.
     */
    where: CorWhereUniqueInput
    /**
     * In case the Cor found by the `where` argument doesn't exist, create a new Cor with this data.
     */
    create: XOR<CorCreateInput, CorUncheckedCreateInput>
    /**
     * In case the Cor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CorUpdateInput, CorUncheckedUpdateInput>
  }

  /**
   * Cor delete
   */
  export type CorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cor
     */
    select?: CorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cor
     */
    omit?: CorOmit<ExtArgs> | null
    /**
     * Filter which Cor to delete.
     */
    where: CorWhereUniqueInput
  }

  /**
   * Cor deleteMany
   */
  export type CorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Cors to delete
     */
    where?: CorWhereInput
    /**
     * Limit how many Cors to delete.
     */
    limit?: number
  }

  /**
   * Cor without action
   */
  export type CorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cor
     */
    select?: CorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cor
     */
    omit?: CorOmit<ExtArgs> | null
  }


  /**
   * Model Fabricante
   */

  export type AggregateFabricante = {
    _count: FabricanteCountAggregateOutputType | null
    _avg: FabricanteAvgAggregateOutputType | null
    _sum: FabricanteSumAggregateOutputType | null
    _min: FabricanteMinAggregateOutputType | null
    _max: FabricanteMaxAggregateOutputType | null
  }

  export type FabricanteAvgAggregateOutputType = {
    id: number | null
  }

  export type FabricanteSumAggregateOutputType = {
    id: number | null
  }

  export type FabricanteMinAggregateOutputType = {
    id: number | null
    descricao: string | null
    data: Date | null
  }

  export type FabricanteMaxAggregateOutputType = {
    id: number | null
    descricao: string | null
    data: Date | null
  }

  export type FabricanteCountAggregateOutputType = {
    id: number
    descricao: number
    data: number
    _all: number
  }


  export type FabricanteAvgAggregateInputType = {
    id?: true
  }

  export type FabricanteSumAggregateInputType = {
    id?: true
  }

  export type FabricanteMinAggregateInputType = {
    id?: true
    descricao?: true
    data?: true
  }

  export type FabricanteMaxAggregateInputType = {
    id?: true
    descricao?: true
    data?: true
  }

  export type FabricanteCountAggregateInputType = {
    id?: true
    descricao?: true
    data?: true
    _all?: true
  }

  export type FabricanteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Fabricante to aggregate.
     */
    where?: FabricanteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fabricantes to fetch.
     */
    orderBy?: FabricanteOrderByWithRelationInput | FabricanteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FabricanteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fabricantes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fabricantes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Fabricantes
    **/
    _count?: true | FabricanteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FabricanteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FabricanteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FabricanteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FabricanteMaxAggregateInputType
  }

  export type GetFabricanteAggregateType<T extends FabricanteAggregateArgs> = {
        [P in keyof T & keyof AggregateFabricante]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFabricante[P]>
      : GetScalarType<T[P], AggregateFabricante[P]>
  }




  export type FabricanteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FabricanteWhereInput
    orderBy?: FabricanteOrderByWithAggregationInput | FabricanteOrderByWithAggregationInput[]
    by: FabricanteScalarFieldEnum[] | FabricanteScalarFieldEnum
    having?: FabricanteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FabricanteCountAggregateInputType | true
    _avg?: FabricanteAvgAggregateInputType
    _sum?: FabricanteSumAggregateInputType
    _min?: FabricanteMinAggregateInputType
    _max?: FabricanteMaxAggregateInputType
  }

  export type FabricanteGroupByOutputType = {
    id: number
    descricao: string
    data: Date
    _count: FabricanteCountAggregateOutputType | null
    _avg: FabricanteAvgAggregateOutputType | null
    _sum: FabricanteSumAggregateOutputType | null
    _min: FabricanteMinAggregateOutputType | null
    _max: FabricanteMaxAggregateOutputType | null
  }

  type GetFabricanteGroupByPayload<T extends FabricanteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FabricanteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FabricanteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FabricanteGroupByOutputType[P]>
            : GetScalarType<T[P], FabricanteGroupByOutputType[P]>
        }
      >
    >


  export type FabricanteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    descricao?: boolean
    data?: boolean
  }, ExtArgs["result"]["fabricante"]>

  export type FabricanteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    descricao?: boolean
    data?: boolean
  }, ExtArgs["result"]["fabricante"]>

  export type FabricanteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    descricao?: boolean
    data?: boolean
  }, ExtArgs["result"]["fabricante"]>

  export type FabricanteSelectScalar = {
    id?: boolean
    descricao?: boolean
    data?: boolean
  }

  export type FabricanteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "descricao" | "data", ExtArgs["result"]["fabricante"]>

  export type $FabricantePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Fabricante"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      descricao: string
      data: Date
    }, ExtArgs["result"]["fabricante"]>
    composites: {}
  }

  type FabricanteGetPayload<S extends boolean | null | undefined | FabricanteDefaultArgs> = $Result.GetResult<Prisma.$FabricantePayload, S>

  type FabricanteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FabricanteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FabricanteCountAggregateInputType | true
    }

  export interface FabricanteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Fabricante'], meta: { name: 'Fabricante' } }
    /**
     * Find zero or one Fabricante that matches the filter.
     * @param {FabricanteFindUniqueArgs} args - Arguments to find a Fabricante
     * @example
     * // Get one Fabricante
     * const fabricante = await prisma.fabricante.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FabricanteFindUniqueArgs>(args: SelectSubset<T, FabricanteFindUniqueArgs<ExtArgs>>): Prisma__FabricanteClient<$Result.GetResult<Prisma.$FabricantePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Fabricante that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FabricanteFindUniqueOrThrowArgs} args - Arguments to find a Fabricante
     * @example
     * // Get one Fabricante
     * const fabricante = await prisma.fabricante.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FabricanteFindUniqueOrThrowArgs>(args: SelectSubset<T, FabricanteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FabricanteClient<$Result.GetResult<Prisma.$FabricantePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Fabricante that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FabricanteFindFirstArgs} args - Arguments to find a Fabricante
     * @example
     * // Get one Fabricante
     * const fabricante = await prisma.fabricante.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FabricanteFindFirstArgs>(args?: SelectSubset<T, FabricanteFindFirstArgs<ExtArgs>>): Prisma__FabricanteClient<$Result.GetResult<Prisma.$FabricantePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Fabricante that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FabricanteFindFirstOrThrowArgs} args - Arguments to find a Fabricante
     * @example
     * // Get one Fabricante
     * const fabricante = await prisma.fabricante.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FabricanteFindFirstOrThrowArgs>(args?: SelectSubset<T, FabricanteFindFirstOrThrowArgs<ExtArgs>>): Prisma__FabricanteClient<$Result.GetResult<Prisma.$FabricantePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Fabricantes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FabricanteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Fabricantes
     * const fabricantes = await prisma.fabricante.findMany()
     * 
     * // Get first 10 Fabricantes
     * const fabricantes = await prisma.fabricante.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fabricanteWithIdOnly = await prisma.fabricante.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FabricanteFindManyArgs>(args?: SelectSubset<T, FabricanteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FabricantePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Fabricante.
     * @param {FabricanteCreateArgs} args - Arguments to create a Fabricante.
     * @example
     * // Create one Fabricante
     * const Fabricante = await prisma.fabricante.create({
     *   data: {
     *     // ... data to create a Fabricante
     *   }
     * })
     * 
     */
    create<T extends FabricanteCreateArgs>(args: SelectSubset<T, FabricanteCreateArgs<ExtArgs>>): Prisma__FabricanteClient<$Result.GetResult<Prisma.$FabricantePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Fabricantes.
     * @param {FabricanteCreateManyArgs} args - Arguments to create many Fabricantes.
     * @example
     * // Create many Fabricantes
     * const fabricante = await prisma.fabricante.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FabricanteCreateManyArgs>(args?: SelectSubset<T, FabricanteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Fabricantes and returns the data saved in the database.
     * @param {FabricanteCreateManyAndReturnArgs} args - Arguments to create many Fabricantes.
     * @example
     * // Create many Fabricantes
     * const fabricante = await prisma.fabricante.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Fabricantes and only return the `id`
     * const fabricanteWithIdOnly = await prisma.fabricante.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FabricanteCreateManyAndReturnArgs>(args?: SelectSubset<T, FabricanteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FabricantePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Fabricante.
     * @param {FabricanteDeleteArgs} args - Arguments to delete one Fabricante.
     * @example
     * // Delete one Fabricante
     * const Fabricante = await prisma.fabricante.delete({
     *   where: {
     *     // ... filter to delete one Fabricante
     *   }
     * })
     * 
     */
    delete<T extends FabricanteDeleteArgs>(args: SelectSubset<T, FabricanteDeleteArgs<ExtArgs>>): Prisma__FabricanteClient<$Result.GetResult<Prisma.$FabricantePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Fabricante.
     * @param {FabricanteUpdateArgs} args - Arguments to update one Fabricante.
     * @example
     * // Update one Fabricante
     * const fabricante = await prisma.fabricante.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FabricanteUpdateArgs>(args: SelectSubset<T, FabricanteUpdateArgs<ExtArgs>>): Prisma__FabricanteClient<$Result.GetResult<Prisma.$FabricantePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Fabricantes.
     * @param {FabricanteDeleteManyArgs} args - Arguments to filter Fabricantes to delete.
     * @example
     * // Delete a few Fabricantes
     * const { count } = await prisma.fabricante.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FabricanteDeleteManyArgs>(args?: SelectSubset<T, FabricanteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Fabricantes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FabricanteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Fabricantes
     * const fabricante = await prisma.fabricante.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FabricanteUpdateManyArgs>(args: SelectSubset<T, FabricanteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Fabricantes and returns the data updated in the database.
     * @param {FabricanteUpdateManyAndReturnArgs} args - Arguments to update many Fabricantes.
     * @example
     * // Update many Fabricantes
     * const fabricante = await prisma.fabricante.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Fabricantes and only return the `id`
     * const fabricanteWithIdOnly = await prisma.fabricante.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FabricanteUpdateManyAndReturnArgs>(args: SelectSubset<T, FabricanteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FabricantePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Fabricante.
     * @param {FabricanteUpsertArgs} args - Arguments to update or create a Fabricante.
     * @example
     * // Update or create a Fabricante
     * const fabricante = await prisma.fabricante.upsert({
     *   create: {
     *     // ... data to create a Fabricante
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Fabricante we want to update
     *   }
     * })
     */
    upsert<T extends FabricanteUpsertArgs>(args: SelectSubset<T, FabricanteUpsertArgs<ExtArgs>>): Prisma__FabricanteClient<$Result.GetResult<Prisma.$FabricantePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Fabricantes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FabricanteCountArgs} args - Arguments to filter Fabricantes to count.
     * @example
     * // Count the number of Fabricantes
     * const count = await prisma.fabricante.count({
     *   where: {
     *     // ... the filter for the Fabricantes we want to count
     *   }
     * })
    **/
    count<T extends FabricanteCountArgs>(
      args?: Subset<T, FabricanteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FabricanteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Fabricante.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FabricanteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FabricanteAggregateArgs>(args: Subset<T, FabricanteAggregateArgs>): Prisma.PrismaPromise<GetFabricanteAggregateType<T>>

    /**
     * Group by Fabricante.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FabricanteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FabricanteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FabricanteGroupByArgs['orderBy'] }
        : { orderBy?: FabricanteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FabricanteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFabricanteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Fabricante model
   */
  readonly fields: FabricanteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Fabricante.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FabricanteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Fabricante model
   */
  interface FabricanteFieldRefs {
    readonly id: FieldRef<"Fabricante", 'Int'>
    readonly descricao: FieldRef<"Fabricante", 'String'>
    readonly data: FieldRef<"Fabricante", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Fabricante findUnique
   */
  export type FabricanteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fabricante
     */
    select?: FabricanteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fabricante
     */
    omit?: FabricanteOmit<ExtArgs> | null
    /**
     * Filter, which Fabricante to fetch.
     */
    where: FabricanteWhereUniqueInput
  }

  /**
   * Fabricante findUniqueOrThrow
   */
  export type FabricanteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fabricante
     */
    select?: FabricanteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fabricante
     */
    omit?: FabricanteOmit<ExtArgs> | null
    /**
     * Filter, which Fabricante to fetch.
     */
    where: FabricanteWhereUniqueInput
  }

  /**
   * Fabricante findFirst
   */
  export type FabricanteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fabricante
     */
    select?: FabricanteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fabricante
     */
    omit?: FabricanteOmit<ExtArgs> | null
    /**
     * Filter, which Fabricante to fetch.
     */
    where?: FabricanteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fabricantes to fetch.
     */
    orderBy?: FabricanteOrderByWithRelationInput | FabricanteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Fabricantes.
     */
    cursor?: FabricanteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fabricantes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fabricantes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Fabricantes.
     */
    distinct?: FabricanteScalarFieldEnum | FabricanteScalarFieldEnum[]
  }

  /**
   * Fabricante findFirstOrThrow
   */
  export type FabricanteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fabricante
     */
    select?: FabricanteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fabricante
     */
    omit?: FabricanteOmit<ExtArgs> | null
    /**
     * Filter, which Fabricante to fetch.
     */
    where?: FabricanteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fabricantes to fetch.
     */
    orderBy?: FabricanteOrderByWithRelationInput | FabricanteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Fabricantes.
     */
    cursor?: FabricanteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fabricantes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fabricantes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Fabricantes.
     */
    distinct?: FabricanteScalarFieldEnum | FabricanteScalarFieldEnum[]
  }

  /**
   * Fabricante findMany
   */
  export type FabricanteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fabricante
     */
    select?: FabricanteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fabricante
     */
    omit?: FabricanteOmit<ExtArgs> | null
    /**
     * Filter, which Fabricantes to fetch.
     */
    where?: FabricanteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fabricantes to fetch.
     */
    orderBy?: FabricanteOrderByWithRelationInput | FabricanteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Fabricantes.
     */
    cursor?: FabricanteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fabricantes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fabricantes.
     */
    skip?: number
    distinct?: FabricanteScalarFieldEnum | FabricanteScalarFieldEnum[]
  }

  /**
   * Fabricante create
   */
  export type FabricanteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fabricante
     */
    select?: FabricanteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fabricante
     */
    omit?: FabricanteOmit<ExtArgs> | null
    /**
     * The data needed to create a Fabricante.
     */
    data: XOR<FabricanteCreateInput, FabricanteUncheckedCreateInput>
  }

  /**
   * Fabricante createMany
   */
  export type FabricanteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Fabricantes.
     */
    data: FabricanteCreateManyInput | FabricanteCreateManyInput[]
  }

  /**
   * Fabricante createManyAndReturn
   */
  export type FabricanteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fabricante
     */
    select?: FabricanteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Fabricante
     */
    omit?: FabricanteOmit<ExtArgs> | null
    /**
     * The data used to create many Fabricantes.
     */
    data: FabricanteCreateManyInput | FabricanteCreateManyInput[]
  }

  /**
   * Fabricante update
   */
  export type FabricanteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fabricante
     */
    select?: FabricanteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fabricante
     */
    omit?: FabricanteOmit<ExtArgs> | null
    /**
     * The data needed to update a Fabricante.
     */
    data: XOR<FabricanteUpdateInput, FabricanteUncheckedUpdateInput>
    /**
     * Choose, which Fabricante to update.
     */
    where: FabricanteWhereUniqueInput
  }

  /**
   * Fabricante updateMany
   */
  export type FabricanteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Fabricantes.
     */
    data: XOR<FabricanteUpdateManyMutationInput, FabricanteUncheckedUpdateManyInput>
    /**
     * Filter which Fabricantes to update
     */
    where?: FabricanteWhereInput
    /**
     * Limit how many Fabricantes to update.
     */
    limit?: number
  }

  /**
   * Fabricante updateManyAndReturn
   */
  export type FabricanteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fabricante
     */
    select?: FabricanteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Fabricante
     */
    omit?: FabricanteOmit<ExtArgs> | null
    /**
     * The data used to update Fabricantes.
     */
    data: XOR<FabricanteUpdateManyMutationInput, FabricanteUncheckedUpdateManyInput>
    /**
     * Filter which Fabricantes to update
     */
    where?: FabricanteWhereInput
    /**
     * Limit how many Fabricantes to update.
     */
    limit?: number
  }

  /**
   * Fabricante upsert
   */
  export type FabricanteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fabricante
     */
    select?: FabricanteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fabricante
     */
    omit?: FabricanteOmit<ExtArgs> | null
    /**
     * The filter to search for the Fabricante to update in case it exists.
     */
    where: FabricanteWhereUniqueInput
    /**
     * In case the Fabricante found by the `where` argument doesn't exist, create a new Fabricante with this data.
     */
    create: XOR<FabricanteCreateInput, FabricanteUncheckedCreateInput>
    /**
     * In case the Fabricante was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FabricanteUpdateInput, FabricanteUncheckedUpdateInput>
  }

  /**
   * Fabricante delete
   */
  export type FabricanteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fabricante
     */
    select?: FabricanteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fabricante
     */
    omit?: FabricanteOmit<ExtArgs> | null
    /**
     * Filter which Fabricante to delete.
     */
    where: FabricanteWhereUniqueInput
  }

  /**
   * Fabricante deleteMany
   */
  export type FabricanteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Fabricantes to delete
     */
    where?: FabricanteWhereInput
    /**
     * Limit how many Fabricantes to delete.
     */
    limit?: number
  }

  /**
   * Fabricante without action
   */
  export type FabricanteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fabricante
     */
    select?: FabricanteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fabricante
     */
    omit?: FabricanteOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ClienteScalarFieldEnum: {
    id: 'id',
    nome_completo: 'nome_completo',
    cpf_cnpj: 'cpf_cnpj',
    rg: 'rg',
    telefone: 'telefone',
    rua: 'rua',
    email: 'email',
    cidade_id: 'cidade_id',
    cep: 'cep',
    bairro: 'bairro',
    numero_casa: 'numero_casa',
    data: 'data'
  };

  export type ClienteScalarFieldEnum = (typeof ClienteScalarFieldEnum)[keyof typeof ClienteScalarFieldEnum]


  export const VeiculoScalarFieldEnum: {
    id: 'id',
    placa: 'placa',
    v_cod_id: 'v_cod_id',
    v_modelo_id: 'v_modelo_id',
    v_fabricante_id: 'v_fabricante_id',
    c_cliente_id: 'c_cliente_id',
    data: 'data'
  };

  export type VeiculoScalarFieldEnum = (typeof VeiculoScalarFieldEnum)[keyof typeof VeiculoScalarFieldEnum]


  export const ModeloScalarFieldEnum: {
    id: 'id',
    descricao: 'descricao',
    data: 'data'
  };

  export type ModeloScalarFieldEnum = (typeof ModeloScalarFieldEnum)[keyof typeof ModeloScalarFieldEnum]


  export const CorScalarFieldEnum: {
    id: 'id',
    descricao: 'descricao',
    data: 'data'
  };

  export type CorScalarFieldEnum = (typeof CorScalarFieldEnum)[keyof typeof CorScalarFieldEnum]


  export const FabricanteScalarFieldEnum: {
    id: 'id',
    descricao: 'descricao',
    data: 'data'
  };

  export type FabricanteScalarFieldEnum = (typeof FabricanteScalarFieldEnum)[keyof typeof FabricanteScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type ClienteWhereInput = {
    AND?: ClienteWhereInput | ClienteWhereInput[]
    OR?: ClienteWhereInput[]
    NOT?: ClienteWhereInput | ClienteWhereInput[]
    id?: IntFilter<"Cliente"> | number
    nome_completo?: StringFilter<"Cliente"> | string
    cpf_cnpj?: StringFilter<"Cliente"> | string
    rg?: StringFilter<"Cliente"> | string
    telefone?: StringFilter<"Cliente"> | string
    rua?: StringFilter<"Cliente"> | string
    email?: StringFilter<"Cliente"> | string
    cidade_id?: IntFilter<"Cliente"> | number
    cep?: StringFilter<"Cliente"> | string
    bairro?: StringFilter<"Cliente"> | string
    numero_casa?: StringFilter<"Cliente"> | string
    data?: DateTimeFilter<"Cliente"> | Date | string
  }

  export type ClienteOrderByWithRelationInput = {
    id?: SortOrder
    nome_completo?: SortOrder
    cpf_cnpj?: SortOrder
    rg?: SortOrder
    telefone?: SortOrder
    rua?: SortOrder
    email?: SortOrder
    cidade_id?: SortOrder
    cep?: SortOrder
    bairro?: SortOrder
    numero_casa?: SortOrder
    data?: SortOrder
  }

  export type ClienteWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ClienteWhereInput | ClienteWhereInput[]
    OR?: ClienteWhereInput[]
    NOT?: ClienteWhereInput | ClienteWhereInput[]
    nome_completo?: StringFilter<"Cliente"> | string
    cpf_cnpj?: StringFilter<"Cliente"> | string
    rg?: StringFilter<"Cliente"> | string
    telefone?: StringFilter<"Cliente"> | string
    rua?: StringFilter<"Cliente"> | string
    email?: StringFilter<"Cliente"> | string
    cidade_id?: IntFilter<"Cliente"> | number
    cep?: StringFilter<"Cliente"> | string
    bairro?: StringFilter<"Cliente"> | string
    numero_casa?: StringFilter<"Cliente"> | string
    data?: DateTimeFilter<"Cliente"> | Date | string
  }, "id">

  export type ClienteOrderByWithAggregationInput = {
    id?: SortOrder
    nome_completo?: SortOrder
    cpf_cnpj?: SortOrder
    rg?: SortOrder
    telefone?: SortOrder
    rua?: SortOrder
    email?: SortOrder
    cidade_id?: SortOrder
    cep?: SortOrder
    bairro?: SortOrder
    numero_casa?: SortOrder
    data?: SortOrder
    _count?: ClienteCountOrderByAggregateInput
    _avg?: ClienteAvgOrderByAggregateInput
    _max?: ClienteMaxOrderByAggregateInput
    _min?: ClienteMinOrderByAggregateInput
    _sum?: ClienteSumOrderByAggregateInput
  }

  export type ClienteScalarWhereWithAggregatesInput = {
    AND?: ClienteScalarWhereWithAggregatesInput | ClienteScalarWhereWithAggregatesInput[]
    OR?: ClienteScalarWhereWithAggregatesInput[]
    NOT?: ClienteScalarWhereWithAggregatesInput | ClienteScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Cliente"> | number
    nome_completo?: StringWithAggregatesFilter<"Cliente"> | string
    cpf_cnpj?: StringWithAggregatesFilter<"Cliente"> | string
    rg?: StringWithAggregatesFilter<"Cliente"> | string
    telefone?: StringWithAggregatesFilter<"Cliente"> | string
    rua?: StringWithAggregatesFilter<"Cliente"> | string
    email?: StringWithAggregatesFilter<"Cliente"> | string
    cidade_id?: IntWithAggregatesFilter<"Cliente"> | number
    cep?: StringWithAggregatesFilter<"Cliente"> | string
    bairro?: StringWithAggregatesFilter<"Cliente"> | string
    numero_casa?: StringWithAggregatesFilter<"Cliente"> | string
    data?: DateTimeWithAggregatesFilter<"Cliente"> | Date | string
  }

  export type VeiculoWhereInput = {
    AND?: VeiculoWhereInput | VeiculoWhereInput[]
    OR?: VeiculoWhereInput[]
    NOT?: VeiculoWhereInput | VeiculoWhereInput[]
    id?: IntFilter<"Veiculo"> | number
    placa?: StringFilter<"Veiculo"> | string
    v_cod_id?: IntFilter<"Veiculo"> | number
    v_modelo_id?: IntFilter<"Veiculo"> | number
    v_fabricante_id?: IntFilter<"Veiculo"> | number
    c_cliente_id?: IntFilter<"Veiculo"> | number
    data?: DateTimeFilter<"Veiculo"> | Date | string
  }

  export type VeiculoOrderByWithRelationInput = {
    id?: SortOrder
    placa?: SortOrder
    v_cod_id?: SortOrder
    v_modelo_id?: SortOrder
    v_fabricante_id?: SortOrder
    c_cliente_id?: SortOrder
    data?: SortOrder
  }

  export type VeiculoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: VeiculoWhereInput | VeiculoWhereInput[]
    OR?: VeiculoWhereInput[]
    NOT?: VeiculoWhereInput | VeiculoWhereInput[]
    placa?: StringFilter<"Veiculo"> | string
    v_cod_id?: IntFilter<"Veiculo"> | number
    v_modelo_id?: IntFilter<"Veiculo"> | number
    v_fabricante_id?: IntFilter<"Veiculo"> | number
    c_cliente_id?: IntFilter<"Veiculo"> | number
    data?: DateTimeFilter<"Veiculo"> | Date | string
  }, "id">

  export type VeiculoOrderByWithAggregationInput = {
    id?: SortOrder
    placa?: SortOrder
    v_cod_id?: SortOrder
    v_modelo_id?: SortOrder
    v_fabricante_id?: SortOrder
    c_cliente_id?: SortOrder
    data?: SortOrder
    _count?: VeiculoCountOrderByAggregateInput
    _avg?: VeiculoAvgOrderByAggregateInput
    _max?: VeiculoMaxOrderByAggregateInput
    _min?: VeiculoMinOrderByAggregateInput
    _sum?: VeiculoSumOrderByAggregateInput
  }

  export type VeiculoScalarWhereWithAggregatesInput = {
    AND?: VeiculoScalarWhereWithAggregatesInput | VeiculoScalarWhereWithAggregatesInput[]
    OR?: VeiculoScalarWhereWithAggregatesInput[]
    NOT?: VeiculoScalarWhereWithAggregatesInput | VeiculoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Veiculo"> | number
    placa?: StringWithAggregatesFilter<"Veiculo"> | string
    v_cod_id?: IntWithAggregatesFilter<"Veiculo"> | number
    v_modelo_id?: IntWithAggregatesFilter<"Veiculo"> | number
    v_fabricante_id?: IntWithAggregatesFilter<"Veiculo"> | number
    c_cliente_id?: IntWithAggregatesFilter<"Veiculo"> | number
    data?: DateTimeWithAggregatesFilter<"Veiculo"> | Date | string
  }

  export type ModeloWhereInput = {
    AND?: ModeloWhereInput | ModeloWhereInput[]
    OR?: ModeloWhereInput[]
    NOT?: ModeloWhereInput | ModeloWhereInput[]
    id?: IntFilter<"Modelo"> | number
    descricao?: StringFilter<"Modelo"> | string
    data?: DateTimeFilter<"Modelo"> | Date | string
  }

  export type ModeloOrderByWithRelationInput = {
    id?: SortOrder
    descricao?: SortOrder
    data?: SortOrder
  }

  export type ModeloWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ModeloWhereInput | ModeloWhereInput[]
    OR?: ModeloWhereInput[]
    NOT?: ModeloWhereInput | ModeloWhereInput[]
    descricao?: StringFilter<"Modelo"> | string
    data?: DateTimeFilter<"Modelo"> | Date | string
  }, "id">

  export type ModeloOrderByWithAggregationInput = {
    id?: SortOrder
    descricao?: SortOrder
    data?: SortOrder
    _count?: ModeloCountOrderByAggregateInput
    _avg?: ModeloAvgOrderByAggregateInput
    _max?: ModeloMaxOrderByAggregateInput
    _min?: ModeloMinOrderByAggregateInput
    _sum?: ModeloSumOrderByAggregateInput
  }

  export type ModeloScalarWhereWithAggregatesInput = {
    AND?: ModeloScalarWhereWithAggregatesInput | ModeloScalarWhereWithAggregatesInput[]
    OR?: ModeloScalarWhereWithAggregatesInput[]
    NOT?: ModeloScalarWhereWithAggregatesInput | ModeloScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Modelo"> | number
    descricao?: StringWithAggregatesFilter<"Modelo"> | string
    data?: DateTimeWithAggregatesFilter<"Modelo"> | Date | string
  }

  export type CorWhereInput = {
    AND?: CorWhereInput | CorWhereInput[]
    OR?: CorWhereInput[]
    NOT?: CorWhereInput | CorWhereInput[]
    id?: IntFilter<"Cor"> | number
    descricao?: StringFilter<"Cor"> | string
    data?: DateTimeFilter<"Cor"> | Date | string
  }

  export type CorOrderByWithRelationInput = {
    id?: SortOrder
    descricao?: SortOrder
    data?: SortOrder
  }

  export type CorWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CorWhereInput | CorWhereInput[]
    OR?: CorWhereInput[]
    NOT?: CorWhereInput | CorWhereInput[]
    descricao?: StringFilter<"Cor"> | string
    data?: DateTimeFilter<"Cor"> | Date | string
  }, "id">

  export type CorOrderByWithAggregationInput = {
    id?: SortOrder
    descricao?: SortOrder
    data?: SortOrder
    _count?: CorCountOrderByAggregateInput
    _avg?: CorAvgOrderByAggregateInput
    _max?: CorMaxOrderByAggregateInput
    _min?: CorMinOrderByAggregateInput
    _sum?: CorSumOrderByAggregateInput
  }

  export type CorScalarWhereWithAggregatesInput = {
    AND?: CorScalarWhereWithAggregatesInput | CorScalarWhereWithAggregatesInput[]
    OR?: CorScalarWhereWithAggregatesInput[]
    NOT?: CorScalarWhereWithAggregatesInput | CorScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Cor"> | number
    descricao?: StringWithAggregatesFilter<"Cor"> | string
    data?: DateTimeWithAggregatesFilter<"Cor"> | Date | string
  }

  export type FabricanteWhereInput = {
    AND?: FabricanteWhereInput | FabricanteWhereInput[]
    OR?: FabricanteWhereInput[]
    NOT?: FabricanteWhereInput | FabricanteWhereInput[]
    id?: IntFilter<"Fabricante"> | number
    descricao?: StringFilter<"Fabricante"> | string
    data?: DateTimeFilter<"Fabricante"> | Date | string
  }

  export type FabricanteOrderByWithRelationInput = {
    id?: SortOrder
    descricao?: SortOrder
    data?: SortOrder
  }

  export type FabricanteWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: FabricanteWhereInput | FabricanteWhereInput[]
    OR?: FabricanteWhereInput[]
    NOT?: FabricanteWhereInput | FabricanteWhereInput[]
    descricao?: StringFilter<"Fabricante"> | string
    data?: DateTimeFilter<"Fabricante"> | Date | string
  }, "id">

  export type FabricanteOrderByWithAggregationInput = {
    id?: SortOrder
    descricao?: SortOrder
    data?: SortOrder
    _count?: FabricanteCountOrderByAggregateInput
    _avg?: FabricanteAvgOrderByAggregateInput
    _max?: FabricanteMaxOrderByAggregateInput
    _min?: FabricanteMinOrderByAggregateInput
    _sum?: FabricanteSumOrderByAggregateInput
  }

  export type FabricanteScalarWhereWithAggregatesInput = {
    AND?: FabricanteScalarWhereWithAggregatesInput | FabricanteScalarWhereWithAggregatesInput[]
    OR?: FabricanteScalarWhereWithAggregatesInput[]
    NOT?: FabricanteScalarWhereWithAggregatesInput | FabricanteScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Fabricante"> | number
    descricao?: StringWithAggregatesFilter<"Fabricante"> | string
    data?: DateTimeWithAggregatesFilter<"Fabricante"> | Date | string
  }

  export type ClienteCreateInput = {
    nome_completo: string
    cpf_cnpj: string
    rg: string
    telefone: string
    rua: string
    email: string
    cidade_id: number
    cep: string
    bairro: string
    numero_casa: string
    data?: Date | string
  }

  export type ClienteUncheckedCreateInput = {
    id?: number
    nome_completo: string
    cpf_cnpj: string
    rg: string
    telefone: string
    rua: string
    email: string
    cidade_id: number
    cep: string
    bairro: string
    numero_casa: string
    data?: Date | string
  }

  export type ClienteUpdateInput = {
    nome_completo?: StringFieldUpdateOperationsInput | string
    cpf_cnpj?: StringFieldUpdateOperationsInput | string
    rg?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    rua?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    cidade_id?: IntFieldUpdateOperationsInput | number
    cep?: StringFieldUpdateOperationsInput | string
    bairro?: StringFieldUpdateOperationsInput | string
    numero_casa?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClienteUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome_completo?: StringFieldUpdateOperationsInput | string
    cpf_cnpj?: StringFieldUpdateOperationsInput | string
    rg?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    rua?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    cidade_id?: IntFieldUpdateOperationsInput | number
    cep?: StringFieldUpdateOperationsInput | string
    bairro?: StringFieldUpdateOperationsInput | string
    numero_casa?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClienteCreateManyInput = {
    id?: number
    nome_completo: string
    cpf_cnpj: string
    rg: string
    telefone: string
    rua: string
    email: string
    cidade_id: number
    cep: string
    bairro: string
    numero_casa: string
    data?: Date | string
  }

  export type ClienteUpdateManyMutationInput = {
    nome_completo?: StringFieldUpdateOperationsInput | string
    cpf_cnpj?: StringFieldUpdateOperationsInput | string
    rg?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    rua?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    cidade_id?: IntFieldUpdateOperationsInput | number
    cep?: StringFieldUpdateOperationsInput | string
    bairro?: StringFieldUpdateOperationsInput | string
    numero_casa?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClienteUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome_completo?: StringFieldUpdateOperationsInput | string
    cpf_cnpj?: StringFieldUpdateOperationsInput | string
    rg?: StringFieldUpdateOperationsInput | string
    telefone?: StringFieldUpdateOperationsInput | string
    rua?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    cidade_id?: IntFieldUpdateOperationsInput | number
    cep?: StringFieldUpdateOperationsInput | string
    bairro?: StringFieldUpdateOperationsInput | string
    numero_casa?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VeiculoCreateInput = {
    placa: string
    v_cod_id: number
    v_modelo_id: number
    v_fabricante_id: number
    c_cliente_id: number
    data?: Date | string
  }

  export type VeiculoUncheckedCreateInput = {
    id?: number
    placa: string
    v_cod_id: number
    v_modelo_id: number
    v_fabricante_id: number
    c_cliente_id: number
    data?: Date | string
  }

  export type VeiculoUpdateInput = {
    placa?: StringFieldUpdateOperationsInput | string
    v_cod_id?: IntFieldUpdateOperationsInput | number
    v_modelo_id?: IntFieldUpdateOperationsInput | number
    v_fabricante_id?: IntFieldUpdateOperationsInput | number
    c_cliente_id?: IntFieldUpdateOperationsInput | number
    data?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VeiculoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    placa?: StringFieldUpdateOperationsInput | string
    v_cod_id?: IntFieldUpdateOperationsInput | number
    v_modelo_id?: IntFieldUpdateOperationsInput | number
    v_fabricante_id?: IntFieldUpdateOperationsInput | number
    c_cliente_id?: IntFieldUpdateOperationsInput | number
    data?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VeiculoCreateManyInput = {
    id?: number
    placa: string
    v_cod_id: number
    v_modelo_id: number
    v_fabricante_id: number
    c_cliente_id: number
    data?: Date | string
  }

  export type VeiculoUpdateManyMutationInput = {
    placa?: StringFieldUpdateOperationsInput | string
    v_cod_id?: IntFieldUpdateOperationsInput | number
    v_modelo_id?: IntFieldUpdateOperationsInput | number
    v_fabricante_id?: IntFieldUpdateOperationsInput | number
    c_cliente_id?: IntFieldUpdateOperationsInput | number
    data?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VeiculoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    placa?: StringFieldUpdateOperationsInput | string
    v_cod_id?: IntFieldUpdateOperationsInput | number
    v_modelo_id?: IntFieldUpdateOperationsInput | number
    v_fabricante_id?: IntFieldUpdateOperationsInput | number
    c_cliente_id?: IntFieldUpdateOperationsInput | number
    data?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModeloCreateInput = {
    descricao: string
    data?: Date | string
  }

  export type ModeloUncheckedCreateInput = {
    id?: number
    descricao: string
    data?: Date | string
  }

  export type ModeloUpdateInput = {
    descricao?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModeloUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    descricao?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModeloCreateManyInput = {
    id?: number
    descricao: string
    data?: Date | string
  }

  export type ModeloUpdateManyMutationInput = {
    descricao?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModeloUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    descricao?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CorCreateInput = {
    descricao: string
    data?: Date | string
  }

  export type CorUncheckedCreateInput = {
    id?: number
    descricao: string
    data?: Date | string
  }

  export type CorUpdateInput = {
    descricao?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CorUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    descricao?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CorCreateManyInput = {
    id?: number
    descricao: string
    data?: Date | string
  }

  export type CorUpdateManyMutationInput = {
    descricao?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CorUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    descricao?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FabricanteCreateInput = {
    descricao: string
    data?: Date | string
  }

  export type FabricanteUncheckedCreateInput = {
    id?: number
    descricao: string
    data?: Date | string
  }

  export type FabricanteUpdateInput = {
    descricao?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FabricanteUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    descricao?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FabricanteCreateManyInput = {
    id?: number
    descricao: string
    data?: Date | string
  }

  export type FabricanteUpdateManyMutationInput = {
    descricao?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FabricanteUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    descricao?: StringFieldUpdateOperationsInput | string
    data?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ClienteCountOrderByAggregateInput = {
    id?: SortOrder
    nome_completo?: SortOrder
    cpf_cnpj?: SortOrder
    rg?: SortOrder
    telefone?: SortOrder
    rua?: SortOrder
    email?: SortOrder
    cidade_id?: SortOrder
    cep?: SortOrder
    bairro?: SortOrder
    numero_casa?: SortOrder
    data?: SortOrder
  }

  export type ClienteAvgOrderByAggregateInput = {
    id?: SortOrder
    cidade_id?: SortOrder
  }

  export type ClienteMaxOrderByAggregateInput = {
    id?: SortOrder
    nome_completo?: SortOrder
    cpf_cnpj?: SortOrder
    rg?: SortOrder
    telefone?: SortOrder
    rua?: SortOrder
    email?: SortOrder
    cidade_id?: SortOrder
    cep?: SortOrder
    bairro?: SortOrder
    numero_casa?: SortOrder
    data?: SortOrder
  }

  export type ClienteMinOrderByAggregateInput = {
    id?: SortOrder
    nome_completo?: SortOrder
    cpf_cnpj?: SortOrder
    rg?: SortOrder
    telefone?: SortOrder
    rua?: SortOrder
    email?: SortOrder
    cidade_id?: SortOrder
    cep?: SortOrder
    bairro?: SortOrder
    numero_casa?: SortOrder
    data?: SortOrder
  }

  export type ClienteSumOrderByAggregateInput = {
    id?: SortOrder
    cidade_id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type VeiculoCountOrderByAggregateInput = {
    id?: SortOrder
    placa?: SortOrder
    v_cod_id?: SortOrder
    v_modelo_id?: SortOrder
    v_fabricante_id?: SortOrder
    c_cliente_id?: SortOrder
    data?: SortOrder
  }

  export type VeiculoAvgOrderByAggregateInput = {
    id?: SortOrder
    v_cod_id?: SortOrder
    v_modelo_id?: SortOrder
    v_fabricante_id?: SortOrder
    c_cliente_id?: SortOrder
  }

  export type VeiculoMaxOrderByAggregateInput = {
    id?: SortOrder
    placa?: SortOrder
    v_cod_id?: SortOrder
    v_modelo_id?: SortOrder
    v_fabricante_id?: SortOrder
    c_cliente_id?: SortOrder
    data?: SortOrder
  }

  export type VeiculoMinOrderByAggregateInput = {
    id?: SortOrder
    placa?: SortOrder
    v_cod_id?: SortOrder
    v_modelo_id?: SortOrder
    v_fabricante_id?: SortOrder
    c_cliente_id?: SortOrder
    data?: SortOrder
  }

  export type VeiculoSumOrderByAggregateInput = {
    id?: SortOrder
    v_cod_id?: SortOrder
    v_modelo_id?: SortOrder
    v_fabricante_id?: SortOrder
    c_cliente_id?: SortOrder
  }

  export type ModeloCountOrderByAggregateInput = {
    id?: SortOrder
    descricao?: SortOrder
    data?: SortOrder
  }

  export type ModeloAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ModeloMaxOrderByAggregateInput = {
    id?: SortOrder
    descricao?: SortOrder
    data?: SortOrder
  }

  export type ModeloMinOrderByAggregateInput = {
    id?: SortOrder
    descricao?: SortOrder
    data?: SortOrder
  }

  export type ModeloSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CorCountOrderByAggregateInput = {
    id?: SortOrder
    descricao?: SortOrder
    data?: SortOrder
  }

  export type CorAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CorMaxOrderByAggregateInput = {
    id?: SortOrder
    descricao?: SortOrder
    data?: SortOrder
  }

  export type CorMinOrderByAggregateInput = {
    id?: SortOrder
    descricao?: SortOrder
    data?: SortOrder
  }

  export type CorSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type FabricanteCountOrderByAggregateInput = {
    id?: SortOrder
    descricao?: SortOrder
    data?: SortOrder
  }

  export type FabricanteAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type FabricanteMaxOrderByAggregateInput = {
    id?: SortOrder
    descricao?: SortOrder
    data?: SortOrder
  }

  export type FabricanteMinOrderByAggregateInput = {
    id?: SortOrder
    descricao?: SortOrder
    data?: SortOrder
  }

  export type FabricanteSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}