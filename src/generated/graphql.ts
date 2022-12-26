import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Application = {
  __typename?: 'Application';
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  name: Scalars['String'];
  versions?: Maybe<Array<Version>>;
};

export type ApplicationInput = {
  id?: InputMaybe<Scalars['ID']>;
  isActive: Scalars['Boolean'];
  name: Scalars['String'];
};

export type Deploy = {
  __typename?: 'Deploy';
  environment?: Maybe<Environment>;
  environmentId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  version?: Maybe<Version>;
  versionId?: Maybe<Scalars['String']>;
};

export type Environment = {
  __typename?: 'Environment';
  deploys?: Maybe<Array<Deploy>>;
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  orderIndex: Scalars['Int'];
  rules?: Maybe<Array<Rule>>;
};

export type EnvironmentInput = {
  description: Scalars['String'];
  id?: InputMaybe<Scalars['ID']>;
  name: Scalars['String'];
  orderIndex: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  application?: Maybe<Application>;
  environment?: Maybe<Environment>;
  rule?: Maybe<Rule>;
  ruleKey?: Maybe<RuleKey>;
  status?: Maybe<Status>;
  version?: Maybe<Version>;
};


export type MutationApplicationArgs = {
  application?: InputMaybe<ApplicationInput>;
};


export type MutationEnvironmentArgs = {
  environment?: InputMaybe<EnvironmentInput>;
};


export type MutationRuleArgs = {
  rule?: InputMaybe<RuleInput>;
};


export type MutationRuleKeyArgs = {
  ruleKey?: InputMaybe<RuleKeyInput>;
};


export type MutationVersionArgs = {
  version?: InputMaybe<VersionInput>;
};

export type Query = {
  __typename?: 'Query';
  application?: Maybe<Application>;
  applications?: Maybe<Array<Application>>;
  deploys?: Maybe<Array<Deploy>>;
  environment?: Maybe<Environment>;
  environments?: Maybe<Array<Environment>>;
  ruleKeys?: Maybe<Array<RuleKey>>;
  rules?: Maybe<Array<Rule>>;
  status?: Maybe<Status>;
  versions?: Maybe<Array<Version>>;
};


export type QueryApplicationArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryApplicationsArgs = {
  p?: InputMaybe<Scalars['String']>;
};


export type QueryDeploysArgs = {
  p?: InputMaybe<Scalars['String']>;
};


export type QueryEnvironmentArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryEnvironmentsArgs = {
  p?: InputMaybe<Scalars['String']>;
};


export type QueryRuleKeysArgs = {
  p?: InputMaybe<Scalars['String']>;
};


export type QueryRulesArgs = {
  p?: InputMaybe<Scalars['String']>;
};


export type QueryVersionsArgs = {
  p?: InputMaybe<Scalars['String']>;
};

export type Rule = {
  __typename?: 'Rule';
  environment?: Maybe<Environment>;
  environmentId: Scalars['String'];
  id: Scalars['ID'];
  key?: Maybe<RuleKey>;
  keyId: Scalars['String'];
  value: Scalars['String'];
};

export type RuleInput = {
  environmentId: Scalars['String'];
  id?: InputMaybe<Scalars['ID']>;
  keyId: Scalars['String'];
  value: Scalars['String'];
};

export type RuleKey = {
  __typename?: 'RuleKey';
  id: Scalars['ID'];
  name: Scalars['String'];
  specificity: Scalars['Int'];
};

export type RuleKeyInput = {
  id?: InputMaybe<Scalars['ID']>;
  name: Scalars['String'];
  specificity: Scalars['Int'];
};

export type Status = {
  __typename?: 'Status';
  ready?: Maybe<Scalars['Boolean']>;
};

export type Version = {
  __typename?: 'Version';
  application?: Maybe<Application>;
  applicationId: Scalars['String'];
  deploys?: Maybe<Array<Deploy>>;
  id: Scalars['ID'];
  version: Scalars['String'];
};

export type VersionInput = {
  applicationId: Scalars['String'];
  id?: InputMaybe<Scalars['ID']>;
  version: Scalars['String'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Application: ResolverTypeWrapper<Application>;
  ApplicationInput: ApplicationInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Deploy: ResolverTypeWrapper<Deploy>;
  Environment: ResolverTypeWrapper<Environment>;
  EnvironmentInput: EnvironmentInput;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Rule: ResolverTypeWrapper<Rule>;
  RuleInput: RuleInput;
  RuleKey: ResolverTypeWrapper<RuleKey>;
  RuleKeyInput: RuleKeyInput;
  Status: ResolverTypeWrapper<Status>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Version: ResolverTypeWrapper<Version>;
  VersionInput: VersionInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Application: Application;
  ApplicationInput: ApplicationInput;
  Boolean: Scalars['Boolean'];
  Deploy: Deploy;
  Environment: Environment;
  EnvironmentInput: EnvironmentInput;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Mutation: {};
  Query: {};
  Rule: Rule;
  RuleInput: RuleInput;
  RuleKey: RuleKey;
  RuleKeyInput: RuleKeyInput;
  Status: Status;
  String: Scalars['String'];
  Version: Version;
  VersionInput: VersionInput;
};

export type ApplicationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Application'] = ResolversParentTypes['Application']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  versions?: Resolver<Maybe<Array<ResolversTypes['Version']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeployResolvers<ContextType = any, ParentType extends ResolversParentTypes['Deploy'] = ResolversParentTypes['Deploy']> = {
  environment?: Resolver<Maybe<ResolversTypes['Environment']>, ParentType, ContextType>;
  environmentId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  version?: Resolver<Maybe<ResolversTypes['Version']>, ParentType, ContextType>;
  versionId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EnvironmentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Environment'] = ResolversParentTypes['Environment']> = {
  deploys?: Resolver<Maybe<Array<ResolversTypes['Deploy']>>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  orderIndex?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  rules?: Resolver<Maybe<Array<ResolversTypes['Rule']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  application?: Resolver<Maybe<ResolversTypes['Application']>, ParentType, ContextType, Partial<MutationApplicationArgs>>;
  environment?: Resolver<Maybe<ResolversTypes['Environment']>, ParentType, ContextType, Partial<MutationEnvironmentArgs>>;
  rule?: Resolver<Maybe<ResolversTypes['Rule']>, ParentType, ContextType, Partial<MutationRuleArgs>>;
  ruleKey?: Resolver<Maybe<ResolversTypes['RuleKey']>, ParentType, ContextType, Partial<MutationRuleKeyArgs>>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  version?: Resolver<Maybe<ResolversTypes['Version']>, ParentType, ContextType, Partial<MutationVersionArgs>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  application?: Resolver<Maybe<ResolversTypes['Application']>, ParentType, ContextType, Partial<QueryApplicationArgs>>;
  applications?: Resolver<Maybe<Array<ResolversTypes['Application']>>, ParentType, ContextType, Partial<QueryApplicationsArgs>>;
  deploys?: Resolver<Maybe<Array<ResolversTypes['Deploy']>>, ParentType, ContextType, Partial<QueryDeploysArgs>>;
  environment?: Resolver<Maybe<ResolversTypes['Environment']>, ParentType, ContextType, Partial<QueryEnvironmentArgs>>;
  environments?: Resolver<Maybe<Array<ResolversTypes['Environment']>>, ParentType, ContextType, Partial<QueryEnvironmentsArgs>>;
  ruleKeys?: Resolver<Maybe<Array<ResolversTypes['RuleKey']>>, ParentType, ContextType, Partial<QueryRuleKeysArgs>>;
  rules?: Resolver<Maybe<Array<ResolversTypes['Rule']>>, ParentType, ContextType, Partial<QueryRulesArgs>>;
  status?: Resolver<Maybe<ResolversTypes['Status']>, ParentType, ContextType>;
  versions?: Resolver<Maybe<Array<ResolversTypes['Version']>>, ParentType, ContextType, Partial<QueryVersionsArgs>>;
};

export type RuleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Rule'] = ResolversParentTypes['Rule']> = {
  environment?: Resolver<Maybe<ResolversTypes['Environment']>, ParentType, ContextType>;
  environmentId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  key?: Resolver<Maybe<ResolversTypes['RuleKey']>, ParentType, ContextType>;
  keyId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RuleKeyResolvers<ContextType = any, ParentType extends ResolversParentTypes['RuleKey'] = ResolversParentTypes['RuleKey']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  specificity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StatusResolvers<ContextType = any, ParentType extends ResolversParentTypes['Status'] = ResolversParentTypes['Status']> = {
  ready?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VersionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Version'] = ResolversParentTypes['Version']> = {
  application?: Resolver<Maybe<ResolversTypes['Application']>, ParentType, ContextType>;
  applicationId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  deploys?: Resolver<Maybe<Array<ResolversTypes['Deploy']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  version?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Application?: ApplicationResolvers<ContextType>;
  Deploy?: DeployResolvers<ContextType>;
  Environment?: EnvironmentResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Rule?: RuleResolvers<ContextType>;
  RuleKey?: RuleKeyResolvers<ContextType>;
  Status?: StatusResolvers<ContextType>;
  Version?: VersionResolvers<ContextType>;
};

