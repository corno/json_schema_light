import * as p_ from 'pareto-core/schema'

// types

namespace JSON_Value_ {
    
    export type null_ = null
    
    export type boolean_ = boolean
    
    export type number_ = number
    
    export type string_ = string
    
    export namespace array {
        
        export type L = JSON_Value_
    }
    
    export type array = p_.List<
        array.L
    >
    
    export namespace object_ {
        
        export type D = JSON_Value_
    }
    
    export type object_ = p_.Dictionary<
        object_.D
    >
}

type JSON_Value_ = 
    | readonly ['null', JSON_Value_.null_]
    | readonly ['boolean', JSON_Value_.boolean_]
    | readonly ['number', JSON_Value_.number_]
    | readonly ['string', JSON_Value_.string_]
    | readonly ['array', JSON_Value_.array]
    | readonly ['object', JSON_Value_.object_]

namespace Value_ {
    
    export namespace description {
        
        export type O = string
    }
    
    export type description = p_.Optional_Value<
        description.O
    >
    
    export namespace comment {
        
        export type O = string
    }
    
    export type comment = p_.Optional_Value<
        comment.O
    >
    
    export namespace deprecated {
        
        export type O = boolean
    }
    
    export type deprecated = p_.Optional_Value<
        deprecated.O
    >
    
    export namespace readOnly {
        
        export type O = boolean
    }
    
    export type readOnly = p_.Optional_Value<
        readOnly.O
    >
    
    export namespace writeOnly {
        
        export type O = boolean
    }
    
    export type writeOnly = p_.Optional_Value<
        writeOnly.O
    >
    
    export namespace default_ {
        
        export type O = JSON_Value_
    }
    
    export type default_ = p_.Optional_Value<
        default_.O
    >
    
    export namespace examples {
        
        export type L = JSON_Value_
    }
    
    export type examples = p_.List<
        examples.L
    >
    
    export namespace constraint {
        
        export namespace O {
            
            export namespace oneOf {
                
                export type L = Value_
            }
            
            export type oneOf = p_.List<
                oneOf.L
            >
            
            export namespace anyOf {
                
                export type L = Value_
            }
            
            export type anyOf = p_.List<
                anyOf.L
            >
            
            export namespace allOf {
                
                export type L = Value_
            }
            
            export type allOf = p_.List<
                allOf.L
            >
            
            export type not = Value_
            
            export namespace object_ {
                
                export namespace properties {
                    
                    export type D = Value_
                }
                
                export type properties = p_.Dictionary<
                    properties.D
                >
                
                export namespace patternProperties {
                    
                    export type D = Value_
                }
                
                export type patternProperties = p_.Dictionary<
                    patternProperties.D
                >
                
                export namespace propertyNames {
                    
                    export type O = Value_
                }
                
                export type propertyNames = p_.Optional_Value<
                    propertyNames.O
                >
                
                export namespace maxProperties {
                    
                    export type O = number
                }
                
                export type maxProperties = p_.Optional_Value<
                    maxProperties.O
                >
                
                export namespace minProperties {
                    
                    export type O = number
                }
                
                export type minProperties = p_.Optional_Value<
                    minProperties.O
                >
                
                export namespace required {
                    
                    export type L = string
                }
                
                export type required = p_.List<
                    required.L
                >
                
                export namespace dependentRequired {
                    
                    export namespace D {
                        
                        export type D = null
                    }
                    
                    export type D = p_.Dictionary<
                        D.D
                    >
                }
                
                export type dependentRequired = p_.Dictionary<
                    dependentRequired.D
                >
                
                export namespace additionalProperties {
                    
                    export namespace O {
                        
                        export type allowed = null
                        
                        export type forbidden = null
                        
                        export type schema = Value_
                    }
                    
                    export type O = 
                        | readonly ['allowed', O.allowed]
                        | readonly ['forbidden', O.forbidden]
                        | readonly ['schema', O.schema]
                }
                
                export type additionalProperties = p_.Optional_Value<
                    additionalProperties.O
                >
            }
            
            export type object_ = {
                readonly 'properties': object_.properties
                readonly 'patternProperties': object_.patternProperties
                readonly 'propertyNames': object_.propertyNames
                readonly 'maxProperties': object_.maxProperties
                readonly 'minProperties': object_.minProperties
                readonly 'required': object_.required
                readonly 'dependentRequired': object_.dependentRequired
                readonly 'additionalProperties': object_.additionalProperties
            }
            
            export namespace array {
                
                export namespace items {
                    
                    export type O = Value_
                }
                
                export type items = p_.Optional_Value<
                    items.O
                >
                
                export namespace maxItems {
                    
                    export type O = number
                }
                
                export type maxItems = p_.Optional_Value<
                    maxItems.O
                >
                
                export namespace minItems {
                    
                    export type O = number
                }
                
                export type minItems = p_.Optional_Value<
                    minItems.O
                >
                
                export namespace prefixItems {
                    
                    export type L = Value_
                }
                
                export type prefixItems = p_.List<
                    prefixItems.L
                >
                
                export namespace uniqueItems {
                    
                    export type O = boolean
                }
                
                export type uniqueItems = p_.Optional_Value<
                    uniqueItems.O
                >
                
                export namespace maxContains {
                    
                    export type O = number
                }
                
                export type maxContains = p_.Optional_Value<
                    maxContains.O
                >
                
                export namespace minContains {
                    
                    export type O = number
                }
                
                export type minContains = p_.Optional_Value<
                    minContains.O
                >
            }
            
            export type array = {
                readonly 'items': array.items
                readonly 'maxItems': array.maxItems
                readonly 'minItems': array.minItems
                readonly 'prefixItems': array.prefixItems
                readonly 'uniqueItems': array.uniqueItems
                readonly 'maxContains': array.maxContains
                readonly 'minContains': array.minContains
            }
            
            export type boolean_ = null
            
            export type null_ = null
            
            export namespace ref {
                
                export type L = string
            }
            
            export type ref = p_.List<
                ref.L
            >
            
            export namespace string_ {
                
                export namespace variable {
                    
                    export namespace maxLength {
                        
                        export type O = number
                    }
                    
                    export type maxLength = p_.Optional_Value<
                        maxLength.O
                    >
                    
                    export namespace minLength {
                        
                        export type O = number
                    }
                    
                    export type minLength = p_.Optional_Value<
                        minLength.O
                    >
                    
                    export namespace pattern {
                        
                        export type O = string
                    }
                    
                    export type pattern = p_.Optional_Value<
                        pattern.O
                    >
                    
                    export namespace format {
                        
                        export type O = string
                    }
                    
                    export type format = p_.Optional_Value<
                        format.O
                    >
                }
                
                export type variable = {
                    readonly 'maxLength': variable.maxLength
                    readonly 'minLength': variable.minLength
                    readonly 'pattern': variable.pattern
                    readonly 'format': variable.format
                }
                
                export type const_ = string
                
                export namespace enum_ {
                    
                    export type D = null
                }
                
                export type enum_ = p_.Dictionary<
                    enum_.D
                >
            }
            
            export type string_ = 
                | readonly ['variable', string_.variable]
                | readonly ['const', string_.const_]
                | readonly ['enum', string_.enum_]
            
            export namespace integer {
                
                export namespace maximum {
                    
                    export namespace O {
                        
                        export type inclusive = number
                        
                        export type exclusive = number
                    }
                    
                    export type O = 
                        | readonly ['inclusive', O.inclusive]
                        | readonly ['exclusive', O.exclusive]
                }
                
                export type maximum = p_.Optional_Value<
                    maximum.O
                >
                
                export namespace minimum {
                    
                    export namespace O {
                        
                        export type inclusive = number
                        
                        export type exclusive = number
                    }
                    
                    export type O = 
                        | readonly ['inclusive', O.inclusive]
                        | readonly ['exclusive', O.exclusive]
                }
                
                export type minimum = p_.Optional_Value<
                    minimum.O
                >
                
                export namespace multipleOf {
                    
                    export type O = number
                }
                
                export type multipleOf = p_.Optional_Value<
                    multipleOf.O
                >
            }
            
            export type integer = {
                readonly 'maximum': integer.maximum
                readonly 'minimum': integer.minimum
                readonly 'multipleOf': integer.multipleOf
            }
            
            export namespace number_ {
                
                export namespace maximum {
                    
                    export namespace O {
                        
                        export type inclusive = number
                        
                        export type exclusive = number
                    }
                    
                    export type O = 
                        | readonly ['inclusive', O.inclusive]
                        | readonly ['exclusive', O.exclusive]
                }
                
                export type maximum = p_.Optional_Value<
                    maximum.O
                >
                
                export namespace minimum {
                    
                    export namespace O {
                        
                        export type inclusive = number
                        
                        export type exclusive = number
                    }
                    
                    export type O = 
                        | readonly ['inclusive', O.inclusive]
                        | readonly ['exclusive', O.exclusive]
                }
                
                export type minimum = p_.Optional_Value<
                    minimum.O
                >
                
                export namespace multipleOf {
                    
                    export type O = number
                }
                
                export type multipleOf = p_.Optional_Value<
                    multipleOf.O
                >
            }
            
            export type number_ = {
                readonly 'maximum': number_.maximum
                readonly 'minimum': number_.minimum
                readonly 'multipleOf': number_.multipleOf
            }
        }
        
        export type O = 
            | readonly ['oneOf', O.oneOf]
            | readonly ['anyOf', O.anyOf]
            | readonly ['allOf', O.allOf]
            | readonly ['not', O.not]
            | readonly ['object', O.object_]
            | readonly ['array', O.array]
            | readonly ['boolean', O.boolean_]
            | readonly ['null', O.null_]
            | readonly ['ref', O.ref]
            | readonly ['string', O.string_]
            | readonly ['integer', O.integer]
            | readonly ['number', O.number_]
    }
    
    export type constraint = p_.Optional_Value<
        constraint.O
    >
}

type Value_ = {
    readonly 'description': Value_.description
    readonly 'comment': Value_.comment
    readonly 'deprecated': Value_.deprecated
    readonly 'readOnly': Value_.readOnly
    readonly 'writeOnly': Value_.writeOnly
    readonly 'default': Value_.default_
    readonly 'examples': Value_.examples
    readonly 'constraint': Value_.constraint
}

namespace Definitions_ {
    
    export namespace D {
        
        export type value = Value_
        
        export type namespace = Definitions_
    }
    
    export type D = 
        | readonly ['value', D.value]
        | readonly ['namespace', D.namespace]
}

type Definitions_ = p_.Dictionary<
    Definitions_.D
>

namespace Document_ {
    
    export namespace schema {
        
        export type O = string
    }
    
    export type schema = p_.Optional_Value<
        schema.O
    >
    
    export namespace id {
        
        export type O = string
    }
    
    export type id = p_.Optional_Value<
        id.O
    >
    
    export type defs = Definitions_
    
    export namespace root_value {
        
        export type O = Value_
    }
    
    export type root_value = p_.Optional_Value<
        root_value.O
    >
}

type Document_ = {
    readonly 'schema': Document_.schema
    readonly 'id': Document_.id
    readonly 'defs': Document_.defs
    readonly 'root value': Document_.root_value
}

type Root_ = Document_

// exported root types
export { 
    type JSON_Value_ as JSON_Value, 
    type Value_ as Value, 
    type Definitions_ as Definitions, 
    type Document_ as Document, 
    type Root_ as Root, 
}
