import * as p_ from 'pareto-core/refiner'

// schemas
import * as s_target from "../schema.js"
import * as s_source from "../../unresolved/schema.js"
import * as s_error from "liana-runtime/modules/resolved_document_deserialization/schemas/resolving/schema"

export namespace declarations {
    
    export type JSON_Value = p_.Refiner<
        s_target.JSON_Value,
        s_error.Error,
        s_source.JSON_Value
    >
    
    export type Value = p_.Refiner<
        s_target.Value,
        s_error.Error,
        s_source.Value
    >
    
    export type Definitions = p_.Refiner<
        s_target.Definitions,
        s_error.Error,
        s_source.Definitions
    >
    
    export type Document = p_.Refiner<
        s_target.Document,
        s_error.Error,
        s_source.Document
    >
    
    export type Root = p_.Refiner<
        s_target.Root,
        s_error.Error,
        s_source.Root
    >
}

// implementations

export const JSON_Value: declarations.JSON_Value = (
    $,
    abort,
) => p_.from.state($).decide(
    (
        $,
    ): s_target.JSON_Value => {
        switch ($[0]) {
            case 'null': return p_.option($, (
                $,
            ) => p_.change_context(
                $,
                (
                    $,
                ) => ['null', null],
            ))
            case 'boolean': return p_.option($, (
                $,
            ) => p_.change_context(
                $,
                (
                    $,
                ) => ['boolean', $],
            ))
            case 'number': return p_.option($, (
                $,
            ) => p_.change_context(
                $,
                (
                    $,
                ) => ['number', $],
            ))
            case 'string': return p_.option($, (
                $,
            ) => p_.change_context(
                $,
                (
                    $,
                ) => ['string', $],
            ))
            case 'array': return p_.option($, (
                $,
            ) => p_.change_context(
                $,
                (
                    $,
                ) => ['array', p_.from.list($).map(
                    (
                        $,
                    ) => JSON_Value(
                        $,
                        abort,
                    ),
                )],
            ))
            case 'object': return p_.option($, (
                $,
            ) => p_.change_context(
                $,
                (
                    $,
                ) => ['object', p_.from.dictionary($).map(
                    (
                        $,
                        id,
                    ) => JSON_Value(
                        $,
                        abort,
                    ),
                )],
            ))
            default: return p_.exhaustive($[0])
        }
    },
)

export const Value: declarations.Value = (
    $,
    abort,
) => ({
    'description': p_.change_context(
        $['description'],
        (
            $,
        ) => p_.from.optional($).map(
            (
                $,
            ) => $,
        ),
    ),
    'comment': p_.change_context(
        $['comment'],
        (
            $,
        ) => p_.from.optional($).map(
            (
                $,
            ) => $,
        ),
    ),
    'deprecated': p_.change_context(
        $['deprecated'],
        (
            $,
        ) => p_.from.optional($).map(
            (
                $,
            ) => $,
        ),
    ),
    'readOnly': p_.change_context(
        $['readOnly'],
        (
            $,
        ) => p_.from.optional($).map(
            (
                $,
            ) => $,
        ),
    ),
    'writeOnly': p_.change_context(
        $['writeOnly'],
        (
            $,
        ) => p_.from.optional($).map(
            (
                $,
            ) => $,
        ),
    ),
    'default': p_.change_context(
        $['default'],
        (
            $,
        ) => p_.from.optional($).map(
            (
                $,
            ) => JSON_Value(
                $,
                abort,
            ),
        ),
    ),
    'examples': p_.change_context(
        $['examples'],
        (
            $,
        ) => p_.from.list($).map(
            (
                $,
            ) => JSON_Value(
                $,
                abort,
            ),
        ),
    ),
    'constraint': p_.change_context(
        $['constraint'],
        (
            $,
        ) => p_.from.optional($).map(
            (
                $,
            ) => p_.from.state($).decide(
                (
                    $,
                ): s_target.Value.constraint.O => {
                    switch ($[0]) {
                        case 'oneOf': return p_.option($, (
                            $,
                        ) => p_.change_context(
                            $,
                            (
                                $,
                            ) => ['oneOf', p_.from.list($).map(
                                (
                                    $,
                                ) => Value(
                                    $,
                                    abort,
                                ),
                            )],
                        ))
                        case 'anyOf': return p_.option($, (
                            $,
                        ) => p_.change_context(
                            $,
                            (
                                $,
                            ) => ['anyOf', p_.from.list($).map(
                                (
                                    $,
                                ) => Value(
                                    $,
                                    abort,
                                ),
                            )],
                        ))
                        case 'allOf': return p_.option($, (
                            $,
                        ) => p_.change_context(
                            $,
                            (
                                $,
                            ) => ['allOf', p_.from.list($).map(
                                (
                                    $,
                                ) => Value(
                                    $,
                                    abort,
                                ),
                            )],
                        ))
                        case 'not': return p_.option($, (
                            $,
                        ) => p_.change_context(
                            $,
                            (
                                $,
                            ) => ['not', Value(
                                $,
                                abort,
                            )],
                        ))
                        case 'object': return p_.option($, (
                            $,
                        ) => p_.change_context(
                            $,
                            (
                                $,
                            ) => ['object', {
                                'properties': p_.change_context(
                                    $['properties'],
                                    (
                                        $,
                                    ) => p_.from.dictionary($).map(
                                        (
                                            $,
                                            id,
                                        ) => Value(
                                            $,
                                            abort,
                                        ),
                                    ),
                                ),
                                'patternProperties': p_.change_context(
                                    $['patternProperties'],
                                    (
                                        $,
                                    ) => p_.from.dictionary($).map(
                                        (
                                            $,
                                            id,
                                        ) => Value(
                                            $,
                                            abort,
                                        ),
                                    ),
                                ),
                                'propertyNames': p_.change_context(
                                    $['propertyNames'],
                                    (
                                        $,
                                    ) => p_.from.optional($).map(
                                        (
                                            $,
                                        ) => Value(
                                            $,
                                            abort,
                                        ),
                                    ),
                                ),
                                'maxProperties': p_.change_context(
                                    $['maxProperties'],
                                    (
                                        $,
                                    ) => p_.from.optional($).map(
                                        (
                                            $,
                                        ) => $,
                                    ),
                                ),
                                'minProperties': p_.change_context(
                                    $['minProperties'],
                                    (
                                        $,
                                    ) => p_.from.optional($).map(
                                        (
                                            $,
                                        ) => $,
                                    ),
                                ),
                                'required': p_.change_context(
                                    $['required'],
                                    (
                                        $,
                                    ) => p_.from.list($).map(
                                        (
                                            $,
                                        ) => $,
                                    ),
                                ),
                                'dependentRequired': p_.change_context(
                                    $['dependentRequired'],
                                    (
                                        $,
                                    ) => p_.from.dictionary($).map(
                                        (
                                            $,
                                            id,
                                        ) => p_.from.dictionary($).map(
                                            (
                                                $,
                                                id,
                                            ) => null,
                                        ),
                                    ),
                                ),
                                'additionalProperties': p_.change_context(
                                    $['additionalProperties'],
                                    (
                                        $,
                                    ) => p_.from.optional($).map(
                                        (
                                            $,
                                        ) => p_.from.state($).decide(
                                            (
                                                $,
                                            ): s_target.Value.constraint.O.object_.additionalProperties.O => {
                                                switch ($[0]) {
                                                    case 'allowed': return p_.option($, (
                                                        $,
                                                    ) => p_.change_context(
                                                        $,
                                                        (
                                                            $,
                                                        ) => ['allowed', null],
                                                    ))
                                                    case 'forbidden': return p_.option($, (
                                                        $,
                                                    ) => p_.change_context(
                                                        $,
                                                        (
                                                            $,
                                                        ) => ['forbidden', null],
                                                    ))
                                                    case 'schema': return p_.option($, (
                                                        $,
                                                    ) => p_.change_context(
                                                        $,
                                                        (
                                                            $,
                                                        ) => ['schema', Value(
                                                            $,
                                                            abort,
                                                        )],
                                                    ))
                                                    default: return p_.exhaustive($[0])
                                                }
                                            },
                                        ),
                                    ),
                                ),
                            }],
                        ))
                        case 'array': return p_.option($, (
                            $,
                        ) => p_.change_context(
                            $,
                            (
                                $,
                            ) => ['array', {
                                'items': p_.change_context(
                                    $['items'],
                                    (
                                        $,
                                    ) => p_.from.optional($).map(
                                        (
                                            $,
                                        ) => Value(
                                            $,
                                            abort,
                                        ),
                                    ),
                                ),
                                'maxItems': p_.change_context(
                                    $['maxItems'],
                                    (
                                        $,
                                    ) => p_.from.optional($).map(
                                        (
                                            $,
                                        ) => $,
                                    ),
                                ),
                                'minItems': p_.change_context(
                                    $['minItems'],
                                    (
                                        $,
                                    ) => p_.from.optional($).map(
                                        (
                                            $,
                                        ) => $,
                                    ),
                                ),
                                'prefixItems': p_.change_context(
                                    $['prefixItems'],
                                    (
                                        $,
                                    ) => p_.from.list($).map(
                                        (
                                            $,
                                        ) => Value(
                                            $,
                                            abort,
                                        ),
                                    ),
                                ),
                                'uniqueItems': p_.change_context(
                                    $['uniqueItems'],
                                    (
                                        $,
                                    ) => p_.from.optional($).map(
                                        (
                                            $,
                                        ) => $,
                                    ),
                                ),
                                'maxContains': p_.change_context(
                                    $['maxContains'],
                                    (
                                        $,
                                    ) => p_.from.optional($).map(
                                        (
                                            $,
                                        ) => $,
                                    ),
                                ),
                                'minContains': p_.change_context(
                                    $['minContains'],
                                    (
                                        $,
                                    ) => p_.from.optional($).map(
                                        (
                                            $,
                                        ) => $,
                                    ),
                                ),
                            }],
                        ))
                        case 'boolean': return p_.option($, (
                            $,
                        ) => p_.change_context(
                            $,
                            (
                                $,
                            ) => ['boolean', null],
                        ))
                        case 'null': return p_.option($, (
                            $,
                        ) => p_.change_context(
                            $,
                            (
                                $,
                            ) => ['null', null],
                        ))
                        case 'ref': return p_.option($, (
                            $,
                        ) => p_.change_context(
                            $,
                            (
                                $,
                            ) => ['ref', p_.from.list($).map(
                                (
                                    $,
                                ) => $,
                            )],
                        ))
                        case 'string': return p_.option($, (
                            $,
                        ) => p_.change_context(
                            $,
                            (
                                $,
                            ) => ['string', p_.from.state($).decide(
                                (
                                    $,
                                ): s_target.Value.constraint.O.string_ => {
                                    switch ($[0]) {
                                        case 'variable': return p_.option($, (
                                            $,
                                        ) => p_.change_context(
                                            $,
                                            (
                                                $,
                                            ) => ['variable', {
                                                'maxLength': p_.change_context(
                                                    $['maxLength'],
                                                    (
                                                        $,
                                                    ) => p_.from.optional($).map(
                                                        (
                                                            $,
                                                        ) => $,
                                                    ),
                                                ),
                                                'minLength': p_.change_context(
                                                    $['minLength'],
                                                    (
                                                        $,
                                                    ) => p_.from.optional($).map(
                                                        (
                                                            $,
                                                        ) => $,
                                                    ),
                                                ),
                                                'pattern': p_.change_context(
                                                    $['pattern'],
                                                    (
                                                        $,
                                                    ) => p_.from.optional($).map(
                                                        (
                                                            $,
                                                        ) => $,
                                                    ),
                                                ),
                                                'format': p_.change_context(
                                                    $['format'],
                                                    (
                                                        $,
                                                    ) => p_.from.optional($).map(
                                                        (
                                                            $,
                                                        ) => $,
                                                    ),
                                                ),
                                            }],
                                        ))
                                        case 'const': return p_.option($, (
                                            $,
                                        ) => p_.change_context(
                                            $,
                                            (
                                                $,
                                            ) => ['const', $],
                                        ))
                                        case 'enum': return p_.option($, (
                                            $,
                                        ) => p_.change_context(
                                            $,
                                            (
                                                $,
                                            ) => ['enum', p_.from.dictionary($).map(
                                                (
                                                    $,
                                                    id,
                                                ) => null,
                                            )],
                                        ))
                                        default: return p_.exhaustive($[0])
                                    }
                                },
                            )],
                        ))
                        case 'integer': return p_.option($, (
                            $,
                        ) => p_.change_context(
                            $,
                            (
                                $,
                            ) => ['integer', {
                                'maximum': p_.change_context(
                                    $['maximum'],
                                    (
                                        $,
                                    ) => p_.from.optional($).map(
                                        (
                                            $,
                                        ) => p_.from.state($).decide(
                                            (
                                                $,
                                            ): s_target.Value.constraint.O.integer.maximum.O => {
                                                switch ($[0]) {
                                                    case 'inclusive': return p_.option($, (
                                                        $,
                                                    ) => p_.change_context(
                                                        $,
                                                        (
                                                            $,
                                                        ) => ['inclusive', $],
                                                    ))
                                                    case 'exclusive': return p_.option($, (
                                                        $,
                                                    ) => p_.change_context(
                                                        $,
                                                        (
                                                            $,
                                                        ) => ['exclusive', $],
                                                    ))
                                                    default: return p_.exhaustive($[0])
                                                }
                                            },
                                        ),
                                    ),
                                ),
                                'minimum': p_.change_context(
                                    $['minimum'],
                                    (
                                        $,
                                    ) => p_.from.optional($).map(
                                        (
                                            $,
                                        ) => p_.from.state($).decide(
                                            (
                                                $,
                                            ): s_target.Value.constraint.O.integer.minimum.O => {
                                                switch ($[0]) {
                                                    case 'inclusive': return p_.option($, (
                                                        $,
                                                    ) => p_.change_context(
                                                        $,
                                                        (
                                                            $,
                                                        ) => ['inclusive', $],
                                                    ))
                                                    case 'exclusive': return p_.option($, (
                                                        $,
                                                    ) => p_.change_context(
                                                        $,
                                                        (
                                                            $,
                                                        ) => ['exclusive', $],
                                                    ))
                                                    default: return p_.exhaustive($[0])
                                                }
                                            },
                                        ),
                                    ),
                                ),
                                'multipleOf': p_.change_context(
                                    $['multipleOf'],
                                    (
                                        $,
                                    ) => p_.from.optional($).map(
                                        (
                                            $,
                                        ) => $,
                                    ),
                                ),
                            }],
                        ))
                        case 'number': return p_.option($, (
                            $,
                        ) => p_.change_context(
                            $,
                            (
                                $,
                            ) => ['number', {
                                'maximum': p_.change_context(
                                    $['maximum'],
                                    (
                                        $,
                                    ) => p_.from.optional($).map(
                                        (
                                            $,
                                        ) => p_.from.state($).decide(
                                            (
                                                $,
                                            ): s_target.Value.constraint.O.number_.maximum.O => {
                                                switch ($[0]) {
                                                    case 'inclusive': return p_.option($, (
                                                        $,
                                                    ) => p_.change_context(
                                                        $,
                                                        (
                                                            $,
                                                        ) => ['inclusive', $],
                                                    ))
                                                    case 'exclusive': return p_.option($, (
                                                        $,
                                                    ) => p_.change_context(
                                                        $,
                                                        (
                                                            $,
                                                        ) => ['exclusive', $],
                                                    ))
                                                    default: return p_.exhaustive($[0])
                                                }
                                            },
                                        ),
                                    ),
                                ),
                                'minimum': p_.change_context(
                                    $['minimum'],
                                    (
                                        $,
                                    ) => p_.from.optional($).map(
                                        (
                                            $,
                                        ) => p_.from.state($).decide(
                                            (
                                                $,
                                            ): s_target.Value.constraint.O.number_.minimum.O => {
                                                switch ($[0]) {
                                                    case 'inclusive': return p_.option($, (
                                                        $,
                                                    ) => p_.change_context(
                                                        $,
                                                        (
                                                            $,
                                                        ) => ['inclusive', $],
                                                    ))
                                                    case 'exclusive': return p_.option($, (
                                                        $,
                                                    ) => p_.change_context(
                                                        $,
                                                        (
                                                            $,
                                                        ) => ['exclusive', $],
                                                    ))
                                                    default: return p_.exhaustive($[0])
                                                }
                                            },
                                        ),
                                    ),
                                ),
                                'multipleOf': p_.change_context(
                                    $['multipleOf'],
                                    (
                                        $,
                                    ) => p_.from.optional($).map(
                                        (
                                            $,
                                        ) => $,
                                    ),
                                ),
                            }],
                        ))
                        default: return p_.exhaustive($[0])
                    }
                },
            ),
        ),
    ),
})

export const Definitions: declarations.Definitions = (
    $,
    abort,
) => p_.from.dictionary($).map(
    (
        $,
        id,
    ) => p_.from.state($).decide(
        (
            $,
        ): s_target.Definitions.D => {
            switch ($[0]) {
                case 'value': return p_.option($, (
                    $,
                ) => p_.change_context(
                    $,
                    (
                        $,
                    ) => ['value', Value(
                        $,
                        abort,
                    )],
                ))
                case 'namespace': return p_.option($, (
                    $,
                ) => p_.change_context(
                    $,
                    (
                        $,
                    ) => ['namespace', Definitions(
                        $,
                        abort,
                    )],
                ))
                default: return p_.exhaustive($[0])
            }
        },
    ),
)

export const Document: declarations.Document = (
    $,
    abort,
) => ({
    'schema': p_.change_context(
        $['schema'],
        (
            $,
        ) => p_.from.optional($).map(
            (
                $,
            ) => $,
        ),
    ),
    'id': p_.change_context(
        $['id'],
        (
            $,
        ) => p_.from.optional($).map(
            (
                $,
            ) => $,
        ),
    ),
    'defs': p_.change_context(
        $['defs'],
        (
            $,
        ) => Definitions(
            $,
            abort,
        ),
    ),
    'root value': p_.change_context(
        $['root value'],
        (
            $,
        ) => p_.from.optional($).map(
            (
                $,
            ) => Value(
                $,
                abort,
            ),
        ),
    ),
})

export const Root: declarations.Root = (
    $,
    abort,
) => Document(
    $,
    abort,
)
