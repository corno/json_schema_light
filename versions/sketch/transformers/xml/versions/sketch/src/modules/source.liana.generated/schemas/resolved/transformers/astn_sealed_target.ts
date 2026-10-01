import * as p_ from 'pareto-core/transformer'

// schemas
import * as s_source from "../schema.js"
import * as s_target from "astn-runtime/modules/serialization/schemas/sealed_target/schema"

// serializer dependencies
import * as ser_primitives from "liana-runtime/modules/serialization/schemas/primitives/serializers"

export namespace declarations {
    
    export type JSON_Value = p_.Transformer<
        s_source.JSON_Value,
        s_target.Value
    >
    
    export type Value = p_.Transformer<
        s_source.Value,
        s_target.Value
    >
    
    export type Definitions = p_.Transformer<
        s_source.Definitions,
        s_target.Value
    >
    
    export type Document = p_.Transformer<
        s_source.Document,
        s_target.Value
    >
    
    export type Root = p_.Transformer<
        s_source.Root,
        s_target.Value
    >
}

// implementations

export const JSON_Value: declarations.JSON_Value = (
    $,
) => ['state', p_.from.state($).decide(
    (
        $,
    ): s_target.Value.state => {
        switch ($[0]) {
            case 'null': return p_.option($, (
                $,
            ) => ({
                'option': 'null',
                'value': ['nothing', null],
            }))
            case 'boolean': return p_.option($, (
                $,
            ) => ({
                'option': 'boolean',
                'value': ['text', {
                    'delimiter': ['none', null],
                    'value': ser_primitives.true_false(
                        $,
                    ),
                }],
            }))
            case 'number': return p_.option($, (
                $,
            ) => ({
                'option': 'number',
                'value': ['text', {
                    'delimiter': ['none', null],
                    'value': ser_primitives.scientific_notation(
                        $,
                        p_.literal.dictionary({
                            "digits": p_implement_me("DIGITS"),
                        }),
                    ),
                }],
            }))
            case 'string': return p_.option($, (
                $,
            ) => ({
                'option': 'string',
                'value': ['text', {
                    'delimiter': ['quote', null],
                    'value': $,
                }],
            }))
            case 'array': return p_.option($, (
                $,
            ) => ({
                'option': 'array',
                'value': ['list', p_.from.list($).map(
                    (
                        $,
                    ) => JSON_Value(
                        $,
                    ),
                )],
            }))
            case 'object': return p_.option($, (
                $,
            ) => ({
                'option': 'object',
                'value': ['dictionary', p_.from.dictionary($).map(
                    (
                        $,
                        id,
                    ) => JSON_Value(
                        $,
                    ),
                )],
            }))
            default: return p_.exhaustive($[0])
        }
    },
)]

export const Value: declarations.Value = (
    $,
) => ['group', ['verbose', p_.literal.dictionary({
    "description": p_.change_context(
        $['description'],
        (
            $,
        ) => ['optional', p_.from.optional($).decide(
            (
                $,
            ): s_target.Value.optional => ['set', ['text', {
                'delimiter': ['quote', null],
                'value': $,
            }]],
            (): s_target.Value.optional => ['not set', null],
        )],
    ),
    "comment": p_.change_context(
        $['comment'],
        (
            $,
        ) => ['optional', p_.from.optional($).decide(
            (
                $,
            ): s_target.Value.optional => ['set', ['text', {
                'delimiter': ['quote', null],
                'value': $,
            }]],
            (): s_target.Value.optional => ['not set', null],
        )],
    ),
    "deprecated": p_.change_context(
        $['deprecated'],
        (
            $,
        ) => ['optional', p_.from.optional($).decide(
            (
                $,
            ): s_target.Value.optional => ['set', ['text', {
                'delimiter': ['none', null],
                'value': ser_primitives.true_false(
                    $,
                ),
            }]],
            (): s_target.Value.optional => ['not set', null],
        )],
    ),
    "readOnly": p_.change_context(
        $['readOnly'],
        (
            $,
        ) => ['optional', p_.from.optional($).decide(
            (
                $,
            ): s_target.Value.optional => ['set', ['text', {
                'delimiter': ['none', null],
                'value': ser_primitives.true_false(
                    $,
                ),
            }]],
            (): s_target.Value.optional => ['not set', null],
        )],
    ),
    "writeOnly": p_.change_context(
        $['writeOnly'],
        (
            $,
        ) => ['optional', p_.from.optional($).decide(
            (
                $,
            ): s_target.Value.optional => ['set', ['text', {
                'delimiter': ['none', null],
                'value': ser_primitives.true_false(
                    $,
                ),
            }]],
            (): s_target.Value.optional => ['not set', null],
        )],
    ),
    "default": p_.change_context(
        $['default'],
        (
            $,
        ) => ['optional', p_.from.optional($).decide(
            (
                $,
            ): s_target.Value.optional => ['set', JSON_Value(
                $,
            )],
            (): s_target.Value.optional => ['not set', null],
        )],
    ),
    "examples": p_.change_context(
        $['examples'],
        (
            $,
        ) => ['list', p_.from.list($).map(
            (
                $,
            ) => JSON_Value(
                $,
            ),
        )],
    ),
    "constraint": p_.change_context(
        $['constraint'],
        (
            $,
        ) => ['optional', p_.from.optional($).decide(
            (
                $,
            ): s_target.Value.optional => ['set', ['state', p_.from.state($).decide(
                (
                    $,
                ): s_target.Value.state => {
                    switch ($[0]) {
                        case 'oneOf': return p_.option($, (
                            $,
                        ) => ({
                            'option': 'oneOf',
                            'value': ['list', p_.from.list($).map(
                                (
                                    $,
                                ) => Value(
                                    $,
                                ),
                            )],
                        }))
                        case 'anyOf': return p_.option($, (
                            $,
                        ) => ({
                            'option': 'anyOf',
                            'value': ['list', p_.from.list($).map(
                                (
                                    $,
                                ) => Value(
                                    $,
                                ),
                            )],
                        }))
                        case 'allOf': return p_.option($, (
                            $,
                        ) => ({
                            'option': 'allOf',
                            'value': ['list', p_.from.list($).map(
                                (
                                    $,
                                ) => Value(
                                    $,
                                ),
                            )],
                        }))
                        case 'not': return p_.option($, (
                            $,
                        ) => ({
                            'option': 'not',
                            'value': Value(
                                $,
                            ),
                        }))
                        case 'object': return p_.option($, (
                            $,
                        ) => ({
                            'option': 'object',
                            'value': ['group', ['verbose', p_.literal.dictionary({
                                "properties": p_.change_context(
                                    $['properties'],
                                    (
                                        $,
                                    ) => ['dictionary', p_.from.dictionary($).map(
                                        (
                                            $,
                                            id,
                                        ) => Value(
                                            $,
                                        ),
                                    )],
                                ),
                                "patternProperties": p_.change_context(
                                    $['patternProperties'],
                                    (
                                        $,
                                    ) => ['dictionary', p_.from.dictionary($).map(
                                        (
                                            $,
                                            id,
                                        ) => Value(
                                            $,
                                        ),
                                    )],
                                ),
                                "propertyNames": p_.change_context(
                                    $['propertyNames'],
                                    (
                                        $,
                                    ) => ['optional', p_.from.optional($).decide(
                                        (
                                            $,
                                        ): s_target.Value.optional => ['set', Value(
                                            $,
                                        )],
                                        (): s_target.Value.optional => ['not set', null],
                                    )],
                                ),
                                "maxProperties": p_.change_context(
                                    $['maxProperties'],
                                    (
                                        $,
                                    ) => ['optional', p_.from.optional($).decide(
                                        (
                                            $,
                                        ): s_target.Value.optional => ['set', ['text', {
                                            'delimiter': ['none', null],
                                            'value': ser_primitives.decimal(
                                                $,
                                            ),
                                        }]],
                                        (): s_target.Value.optional => ['not set', null],
                                    )],
                                ),
                                "minProperties": p_.change_context(
                                    $['minProperties'],
                                    (
                                        $,
                                    ) => ['optional', p_.from.optional($).decide(
                                        (
                                            $,
                                        ): s_target.Value.optional => ['set', ['text', {
                                            'delimiter': ['none', null],
                                            'value': ser_primitives.decimal(
                                                $,
                                            ),
                                        }]],
                                        (): s_target.Value.optional => ['not set', null],
                                    )],
                                ),
                                "required": p_.change_context(
                                    $['required'],
                                    (
                                        $,
                                    ) => ['list', p_.from.list($).map(
                                        (
                                            $,
                                        ) => ['text', {
                                            'delimiter': ['quote', null],
                                            'value': $,
                                        }],
                                    )],
                                ),
                                "dependentRequired": p_.change_context(
                                    $['dependentRequired'],
                                    (
                                        $,
                                    ) => ['dictionary', p_.from.dictionary($).map(
                                        (
                                            $,
                                            id,
                                        ) => ['dictionary', p_.from.dictionary($).map(
                                            (
                                                $,
                                                id,
                                            ) => ['nothing', null],
                                        )],
                                    )],
                                ),
                                "additionalProperties": p_.change_context(
                                    $['additionalProperties'],
                                    (
                                        $,
                                    ) => ['optional', p_.from.optional($).decide(
                                        (
                                            $,
                                        ): s_target.Value.optional => ['set', ['state', p_.from.state($).decide(
                                            (
                                                $,
                                            ): s_target.Value.state => {
                                                switch ($[0]) {
                                                    case 'allowed': return p_.option($, (
                                                        $,
                                                    ) => ({
                                                        'option': 'allowed',
                                                        'value': ['nothing', null],
                                                    }))
                                                    case 'forbidden': return p_.option($, (
                                                        $,
                                                    ) => ({
                                                        'option': 'forbidden',
                                                        'value': ['nothing', null],
                                                    }))
                                                    case 'schema': return p_.option($, (
                                                        $,
                                                    ) => ({
                                                        'option': 'schema',
                                                        'value': Value(
                                                            $,
                                                        ),
                                                    }))
                                                    default: return p_.exhaustive($[0])
                                                }
                                            },
                                        )]],
                                        (): s_target.Value.optional => ['not set', null],
                                    )],
                                ),
                            })]],
                        }))
                        case 'array': return p_.option($, (
                            $,
                        ) => ({
                            'option': 'array',
                            'value': ['group', ['verbose', p_.literal.dictionary({
                                "items": p_.change_context(
                                    $['items'],
                                    (
                                        $,
                                    ) => ['optional', p_.from.optional($).decide(
                                        (
                                            $,
                                        ): s_target.Value.optional => ['set', Value(
                                            $,
                                        )],
                                        (): s_target.Value.optional => ['not set', null],
                                    )],
                                ),
                                "maxItems": p_.change_context(
                                    $['maxItems'],
                                    (
                                        $,
                                    ) => ['optional', p_.from.optional($).decide(
                                        (
                                            $,
                                        ): s_target.Value.optional => ['set', ['text', {
                                            'delimiter': ['none', null],
                                            'value': ser_primitives.decimal(
                                                $,
                                            ),
                                        }]],
                                        (): s_target.Value.optional => ['not set', null],
                                    )],
                                ),
                                "minItems": p_.change_context(
                                    $['minItems'],
                                    (
                                        $,
                                    ) => ['optional', p_.from.optional($).decide(
                                        (
                                            $,
                                        ): s_target.Value.optional => ['set', ['text', {
                                            'delimiter': ['none', null],
                                            'value': ser_primitives.decimal(
                                                $,
                                            ),
                                        }]],
                                        (): s_target.Value.optional => ['not set', null],
                                    )],
                                ),
                                "prefixItems": p_.change_context(
                                    $['prefixItems'],
                                    (
                                        $,
                                    ) => ['list', p_.from.list($).map(
                                        (
                                            $,
                                        ) => Value(
                                            $,
                                        ),
                                    )],
                                ),
                                "uniqueItems": p_.change_context(
                                    $['uniqueItems'],
                                    (
                                        $,
                                    ) => ['optional', p_.from.optional($).decide(
                                        (
                                            $,
                                        ): s_target.Value.optional => ['set', ['text', {
                                            'delimiter': ['none', null],
                                            'value': ser_primitives.true_false(
                                                $,
                                            ),
                                        }]],
                                        (): s_target.Value.optional => ['not set', null],
                                    )],
                                ),
                                "maxContains": p_.change_context(
                                    $['maxContains'],
                                    (
                                        $,
                                    ) => ['optional', p_.from.optional($).decide(
                                        (
                                            $,
                                        ): s_target.Value.optional => ['set', ['text', {
                                            'delimiter': ['none', null],
                                            'value': ser_primitives.decimal(
                                                $,
                                            ),
                                        }]],
                                        (): s_target.Value.optional => ['not set', null],
                                    )],
                                ),
                                "minContains": p_.change_context(
                                    $['minContains'],
                                    (
                                        $,
                                    ) => ['optional', p_.from.optional($).decide(
                                        (
                                            $,
                                        ): s_target.Value.optional => ['set', ['text', {
                                            'delimiter': ['none', null],
                                            'value': ser_primitives.decimal(
                                                $,
                                            ),
                                        }]],
                                        (): s_target.Value.optional => ['not set', null],
                                    )],
                                ),
                            })]],
                        }))
                        case 'boolean': return p_.option($, (
                            $,
                        ) => ({
                            'option': 'boolean',
                            'value': ['nothing', null],
                        }))
                        case 'null': return p_.option($, (
                            $,
                        ) => ({
                            'option': 'null',
                            'value': ['nothing', null],
                        }))
                        case 'ref': return p_.option($, (
                            $,
                        ) => ({
                            'option': 'ref',
                            'value': ['list', p_.from.list($).map(
                                (
                                    $,
                                ) => ['text', {
                                    'delimiter': ['quote', null],
                                    'value': $,
                                }],
                            )],
                        }))
                        case 'string': return p_.option($, (
                            $,
                        ) => ({
                            'option': 'string',
                            'value': ['state', p_.from.state($).decide(
                                (
                                    $,
                                ): s_target.Value.state => {
                                    switch ($[0]) {
                                        case 'variable': return p_.option($, (
                                            $,
                                        ) => ({
                                            'option': 'variable',
                                            'value': ['group', ['verbose', p_.literal.dictionary({
                                                "maxLength": p_.change_context(
                                                    $['maxLength'],
                                                    (
                                                        $,
                                                    ) => ['optional', p_.from.optional($).decide(
                                                        (
                                                            $,
                                                        ): s_target.Value.optional => ['set', ['text', {
                                                            'delimiter': ['none', null],
                                                            'value': ser_primitives.decimal(
                                                                $,
                                                            ),
                                                        }]],
                                                        (): s_target.Value.optional => ['not set', null],
                                                    )],
                                                ),
                                                "minLength": p_.change_context(
                                                    $['minLength'],
                                                    (
                                                        $,
                                                    ) => ['optional', p_.from.optional($).decide(
                                                        (
                                                            $,
                                                        ): s_target.Value.optional => ['set', ['text', {
                                                            'delimiter': ['none', null],
                                                            'value': ser_primitives.decimal(
                                                                $,
                                                            ),
                                                        }]],
                                                        (): s_target.Value.optional => ['not set', null],
                                                    )],
                                                ),
                                                "pattern": p_.change_context(
                                                    $['pattern'],
                                                    (
                                                        $,
                                                    ) => ['optional', p_.from.optional($).decide(
                                                        (
                                                            $,
                                                        ): s_target.Value.optional => ['set', ['text', {
                                                            'delimiter': ['quote', null],
                                                            'value': $,
                                                        }]],
                                                        (): s_target.Value.optional => ['not set', null],
                                                    )],
                                                ),
                                                "format": p_.change_context(
                                                    $['format'],
                                                    (
                                                        $,
                                                    ) => ['optional', p_.from.optional($).decide(
                                                        (
                                                            $,
                                                        ): s_target.Value.optional => ['set', ['text', {
                                                            'delimiter': ['quote', null],
                                                            'value': $,
                                                        }]],
                                                        (): s_target.Value.optional => ['not set', null],
                                                    )],
                                                ),
                                            })]],
                                        }))
                                        case 'const': return p_.option($, (
                                            $,
                                        ) => ({
                                            'option': 'const',
                                            'value': ['text', {
                                                'delimiter': ['quote', null],
                                                'value': $,
                                            }],
                                        }))
                                        case 'enum': return p_.option($, (
                                            $,
                                        ) => ({
                                            'option': 'enum',
                                            'value': ['dictionary', p_.from.dictionary($).map(
                                                (
                                                    $,
                                                    id,
                                                ) => ['nothing', null],
                                            )],
                                        }))
                                        default: return p_.exhaustive($[0])
                                    }
                                },
                            )],
                        }))
                        case 'integer': return p_.option($, (
                            $,
                        ) => ({
                            'option': 'integer',
                            'value': ['group', ['verbose', p_.literal.dictionary({
                                "maximum": p_.change_context(
                                    $['maximum'],
                                    (
                                        $,
                                    ) => ['optional', p_.from.optional($).decide(
                                        (
                                            $,
                                        ): s_target.Value.optional => ['set', ['state', p_.from.state($).decide(
                                            (
                                                $,
                                            ): s_target.Value.state => {
                                                switch ($[0]) {
                                                    case 'inclusive': return p_.option($, (
                                                        $,
                                                    ) => ({
                                                        'option': 'inclusive',
                                                        'value': ['text', {
                                                            'delimiter': ['none', null],
                                                            'value': ser_primitives.decimal(
                                                                $,
                                                            ),
                                                        }],
                                                    }))
                                                    case 'exclusive': return p_.option($, (
                                                        $,
                                                    ) => ({
                                                        'option': 'exclusive',
                                                        'value': ['text', {
                                                            'delimiter': ['none', null],
                                                            'value': ser_primitives.decimal(
                                                                $,
                                                            ),
                                                        }],
                                                    }))
                                                    default: return p_.exhaustive($[0])
                                                }
                                            },
                                        )]],
                                        (): s_target.Value.optional => ['not set', null],
                                    )],
                                ),
                                "minimum": p_.change_context(
                                    $['minimum'],
                                    (
                                        $,
                                    ) => ['optional', p_.from.optional($).decide(
                                        (
                                            $,
                                        ): s_target.Value.optional => ['set', ['state', p_.from.state($).decide(
                                            (
                                                $,
                                            ): s_target.Value.state => {
                                                switch ($[0]) {
                                                    case 'inclusive': return p_.option($, (
                                                        $,
                                                    ) => ({
                                                        'option': 'inclusive',
                                                        'value': ['text', {
                                                            'delimiter': ['none', null],
                                                            'value': ser_primitives.decimal(
                                                                $,
                                                            ),
                                                        }],
                                                    }))
                                                    case 'exclusive': return p_.option($, (
                                                        $,
                                                    ) => ({
                                                        'option': 'exclusive',
                                                        'value': ['text', {
                                                            'delimiter': ['none', null],
                                                            'value': ser_primitives.decimal(
                                                                $,
                                                            ),
                                                        }],
                                                    }))
                                                    default: return p_.exhaustive($[0])
                                                }
                                            },
                                        )]],
                                        (): s_target.Value.optional => ['not set', null],
                                    )],
                                ),
                                "multipleOf": p_.change_context(
                                    $['multipleOf'],
                                    (
                                        $,
                                    ) => ['optional', p_.from.optional($).decide(
                                        (
                                            $,
                                        ): s_target.Value.optional => ['set', ['text', {
                                            'delimiter': ['none', null],
                                            'value': ser_primitives.decimal(
                                                $,
                                            ),
                                        }]],
                                        (): s_target.Value.optional => ['not set', null],
                                    )],
                                ),
                            })]],
                        }))
                        case 'number': return p_.option($, (
                            $,
                        ) => ({
                            'option': 'number',
                            'value': ['group', ['verbose', p_.literal.dictionary({
                                "maximum": p_.change_context(
                                    $['maximum'],
                                    (
                                        $,
                                    ) => ['optional', p_.from.optional($).decide(
                                        (
                                            $,
                                        ): s_target.Value.optional => ['set', ['state', p_.from.state($).decide(
                                            (
                                                $,
                                            ): s_target.Value.state => {
                                                switch ($[0]) {
                                                    case 'inclusive': return p_.option($, (
                                                        $,
                                                    ) => ({
                                                        'option': 'inclusive',
                                                        'value': ['text', {
                                                            'delimiter': ['none', null],
                                                            'value': ser_primitives.decimal(
                                                                $,
                                                            ),
                                                        }],
                                                    }))
                                                    case 'exclusive': return p_.option($, (
                                                        $,
                                                    ) => ({
                                                        'option': 'exclusive',
                                                        'value': ['text', {
                                                            'delimiter': ['none', null],
                                                            'value': ser_primitives.decimal(
                                                                $,
                                                            ),
                                                        }],
                                                    }))
                                                    default: return p_.exhaustive($[0])
                                                }
                                            },
                                        )]],
                                        (): s_target.Value.optional => ['not set', null],
                                    )],
                                ),
                                "minimum": p_.change_context(
                                    $['minimum'],
                                    (
                                        $,
                                    ) => ['optional', p_.from.optional($).decide(
                                        (
                                            $,
                                        ): s_target.Value.optional => ['set', ['state', p_.from.state($).decide(
                                            (
                                                $,
                                            ): s_target.Value.state => {
                                                switch ($[0]) {
                                                    case 'inclusive': return p_.option($, (
                                                        $,
                                                    ) => ({
                                                        'option': 'inclusive',
                                                        'value': ['text', {
                                                            'delimiter': ['none', null],
                                                            'value': ser_primitives.decimal(
                                                                $,
                                                            ),
                                                        }],
                                                    }))
                                                    case 'exclusive': return p_.option($, (
                                                        $,
                                                    ) => ({
                                                        'option': 'exclusive',
                                                        'value': ['text', {
                                                            'delimiter': ['none', null],
                                                            'value': ser_primitives.decimal(
                                                                $,
                                                            ),
                                                        }],
                                                    }))
                                                    default: return p_.exhaustive($[0])
                                                }
                                            },
                                        )]],
                                        (): s_target.Value.optional => ['not set', null],
                                    )],
                                ),
                                "multipleOf": p_.change_context(
                                    $['multipleOf'],
                                    (
                                        $,
                                    ) => ['optional', p_.from.optional($).decide(
                                        (
                                            $,
                                        ): s_target.Value.optional => ['set', ['text', {
                                            'delimiter': ['none', null],
                                            'value': ser_primitives.scientific_notation(
                                                $,
                                                p_.literal.dictionary({
                                                    "digits": p_implement_me("DIGITS"),
                                                }),
                                            ),
                                        }]],
                                        (): s_target.Value.optional => ['not set', null],
                                    )],
                                ),
                            })]],
                        }))
                        default: return p_.exhaustive($[0])
                    }
                },
            )]],
            (): s_target.Value.optional => ['not set', null],
        )],
    ),
})]]

export const Definitions: declarations.Definitions = (
    $,
) => ['dictionary', p_.from.dictionary($).map(
    (
        $,
        id,
    ) => ['state', p_.from.state($).decide(
        (
            $,
        ): s_target.Value.state => {
            switch ($[0]) {
                case 'value': return p_.option($, (
                    $,
                ) => ({
                    'option': 'value',
                    'value': Value(
                        $,
                    ),
                }))
                case 'namespace': return p_.option($, (
                    $,
                ) => ({
                    'option': 'namespace',
                    'value': Definitions(
                        $,
                    ),
                }))
                default: return p_.exhaustive($[0])
            }
        },
    )],
)]

export const Document: declarations.Document = (
    $,
) => ['group', ['verbose', p_.literal.dictionary({
    "schema": p_.change_context(
        $['schema'],
        (
            $,
        ) => ['optional', p_.from.optional($).decide(
            (
                $,
            ): s_target.Value.optional => ['set', ['text', {
                'delimiter': ['quote', null],
                'value': $,
            }]],
            (): s_target.Value.optional => ['not set', null],
        )],
    ),
    "id": p_.change_context(
        $['id'],
        (
            $,
        ) => ['optional', p_.from.optional($).decide(
            (
                $,
            ): s_target.Value.optional => ['set', ['text', {
                'delimiter': ['quote', null],
                'value': $,
            }]],
            (): s_target.Value.optional => ['not set', null],
        )],
    ),
    "defs": p_.change_context(
        $['defs'],
        (
            $,
        ) => Definitions(
            $,
        ),
    ),
    "root value": p_.change_context(
        $['root value'],
        (
            $,
        ) => ['optional', p_.from.optional($).decide(
            (
                $,
            ): s_target.Value.optional => ['set', Value(
                $,
            )],
            (): s_target.Value.optional => ['not set', null],
        )],
    ),
})]]

export const Root: declarations.Root = (
    $,
) => Document(
    $,
)
