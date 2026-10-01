import * as p_ from 'pareto-core/refiner'

// schemas
import * as s_target from "../schema.js"
import * as s_source from "astn-runtime/modules/deserialization/schemas/parse_tree/schema"
import * as s_error from "liana-runtime/modules/value_unmarshalling/schemas/unmarshalling/schema"

// refiner dependencies
import * as r_unmarshalled_from_parse_tree from "liana-runtime/modules/value_unmarshalling/schemas/unmarshalled_value/refiners/astn_parse_tree"

export namespace declarations {
    
    export type JSON_Value = p_.Refiner<
        s_target.JSON_Value,
        s_error.Error,
        s_source.Value
    >
    
    export type Value = p_.Refiner<
        s_target.Value,
        s_error.Error,
        s_source.Value
    >
    
    export type Definitions = p_.Refiner<
        s_target.Definitions,
        s_error.Error,
        s_source.Value
    >
    
    export type Document = p_.Refiner<
        s_target.Document,
        s_error.Error,
        s_source.Value
    >
    
    export type Root = p_.Refiner<
        s_target.Root,
        s_error.Error,
        s_source.Value
    >
}

// implementations

export const JSON_Value: declarations.JSON_Value = (
    $,
    abort,
) => p_.change_context(
    r_unmarshalled_from_parse_tree.State(
        $,
        abort,
    ),
    (
        $,
    ) => p_.from.text($['option']['token']['value']).to_state(
        (
            $text,
        ): s_target.JSON_Value => {
            switch ($text) {
                case "null": return p_.change_context(
                    $['value'],
                    (
                        $,
                    ) => ['null', r_unmarshalled_from_parse_tree.Nothing(
                        $,
                        abort,
                    )],
                )
                case "boolean": return p_.change_context(
                    $['value'],
                    (
                        $,
                    ) => ['boolean', r_unmarshalled_from_parse_tree.Boolean(
                        $,
                        abort,
                        {
                            'type': ['true/false', null],
                        },
                    )],
                )
                case "number": return p_.change_context(
                    $['value'],
                    (
                        $,
                    ) => ['number', r_unmarshalled_from_parse_tree.Number(
                        $,
                        abort,
                        {
                            'type': ['scientific notation', {
                                'precision': 10,
                            }],
                        },
                    )],
                )
                case "string": return p_.change_context(
                    $['value'],
                    (
                        $,
                    ) => ['string', r_unmarshalled_from_parse_tree.Text(
                        $,
                        abort,
                    )],
                )
                case "array": return p_.change_context(
                    $['value'],
                    (
                        $,
                    ) => ['array', p_.from.list(r_unmarshalled_from_parse_tree.List(
                        $,
                        abort,
                    )['items']).map(
                        (
                            $,
                        ) => p_.change_context(
                            $['value'],
                            (
                                $,
                            ) => JSON_Value(
                                $,
                                abort,
                            ),
                        ),
                    )],
                )
                case "object": return p_.change_context(
                    $['value'],
                    (
                        $,
                    ) => ['object', p_.change_context(
                        r_unmarshalled_from_parse_tree.Dictionary(
                            $,
                            abort,
                        ),
                        (
                            $,
                        ) => p_.from.dictionary($['entries']).map(
                            (
                                $,
                                id,
                            ) => JSON_Value(
                                $,
                                abort,
                            ),
                        ),
                    )],
                )
                default: return abort(
                    ['liana', {
                        'type': ['state', ['unknown option', $['option']['token']['value']]],
                        'range': $['option']['range'],
                    }],
                )
            }
        },
    ),
)

export const Value: declarations.Value = (
    $,
    abort,
) => p_.change_context(
    r_unmarshalled_from_parse_tree.Verbose_Group(
        $,
        abort,
        {
            'expected properties': p_.literal.dictionary({
                "description": null,
                "comment": null,
                "deprecated": null,
                "readOnly": null,
                "writeOnly": null,
                "default": null,
                "examples": null,
                "constraint": null,
            }),
        },
    ),
    (
        $,
    ) => ({
        'description': p_.change_context(
            r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'description',
                },
            ),
            (
                $,
            ) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                $,
                abort,
            )['optional']).map(
                (
                    $,
                ) => r_unmarshalled_from_parse_tree.Text(
                    $,
                    abort,
                ),
            ),
        ),
        'comment': p_.change_context(
            r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'comment',
                },
            ),
            (
                $,
            ) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                $,
                abort,
            )['optional']).map(
                (
                    $,
                ) => r_unmarshalled_from_parse_tree.Text(
                    $,
                    abort,
                ),
            ),
        ),
        'deprecated': p_.change_context(
            r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'deprecated',
                },
            ),
            (
                $,
            ) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                $,
                abort,
            )['optional']).map(
                (
                    $,
                ) => r_unmarshalled_from_parse_tree.Boolean(
                    $,
                    abort,
                    {
                        'type': ['true/false', null],
                    },
                ),
            ),
        ),
        'readOnly': p_.change_context(
            r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'readOnly',
                },
            ),
            (
                $,
            ) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                $,
                abort,
            )['optional']).map(
                (
                    $,
                ) => r_unmarshalled_from_parse_tree.Boolean(
                    $,
                    abort,
                    {
                        'type': ['true/false', null],
                    },
                ),
            ),
        ),
        'writeOnly': p_.change_context(
            r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'writeOnly',
                },
            ),
            (
                $,
            ) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                $,
                abort,
            )['optional']).map(
                (
                    $,
                ) => r_unmarshalled_from_parse_tree.Boolean(
                    $,
                    abort,
                    {
                        'type': ['true/false', null],
                    },
                ),
            ),
        ),
        'default': p_.change_context(
            r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'default',
                },
            ),
            (
                $,
            ) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                $,
                abort,
            )['optional']).map(
                (
                    $,
                ) => JSON_Value(
                    $,
                    abort,
                ),
            ),
        ),
        'examples': p_.change_context(
            r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'examples',
                },
            ),
            (
                $,
            ) => p_.from.list(r_unmarshalled_from_parse_tree.List(
                $,
                abort,
            )['items']).map(
                (
                    $,
                ) => p_.change_context(
                    $['value'],
                    (
                        $,
                    ) => JSON_Value(
                        $,
                        abort,
                    ),
                ),
            ),
        ),
        'constraint': p_.change_context(
            r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'constraint',
                },
            ),
            (
                $,
            ) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                $,
                abort,
            )['optional']).map(
                (
                    $,
                ) => p_.change_context(
                    r_unmarshalled_from_parse_tree.State(
                        $,
                        abort,
                    ),
                    (
                        $,
                    ) => p_.from.text($['option']['token']['value']).to_state(
                        (
                            $text,
                        ): s_target.Value.constraint.O => {
                            switch ($text) {
                                case "oneOf": return p_.change_context(
                                    $['value'],
                                    (
                                        $,
                                    ) => ['oneOf', p_.from.list(r_unmarshalled_from_parse_tree.List(
                                        $,
                                        abort,
                                    )['items']).map(
                                        (
                                            $,
                                        ) => p_.change_context(
                                            $['value'],
                                            (
                                                $,
                                            ) => Value(
                                                $,
                                                abort,
                                            ),
                                        ),
                                    )],
                                )
                                case "anyOf": return p_.change_context(
                                    $['value'],
                                    (
                                        $,
                                    ) => ['anyOf', p_.from.list(r_unmarshalled_from_parse_tree.List(
                                        $,
                                        abort,
                                    )['items']).map(
                                        (
                                            $,
                                        ) => p_.change_context(
                                            $['value'],
                                            (
                                                $,
                                            ) => Value(
                                                $,
                                                abort,
                                            ),
                                        ),
                                    )],
                                )
                                case "allOf": return p_.change_context(
                                    $['value'],
                                    (
                                        $,
                                    ) => ['allOf', p_.from.list(r_unmarshalled_from_parse_tree.List(
                                        $,
                                        abort,
                                    )['items']).map(
                                        (
                                            $,
                                        ) => p_.change_context(
                                            $['value'],
                                            (
                                                $,
                                            ) => Value(
                                                $,
                                                abort,
                                            ),
                                        ),
                                    )],
                                )
                                case "not": return p_.change_context(
                                    $['value'],
                                    (
                                        $,
                                    ) => ['not', Value(
                                        $,
                                        abort,
                                    )],
                                )
                                case "object": return p_.change_context(
                                    $['value'],
                                    (
                                        $,
                                    ) => ['object', p_.change_context(
                                        r_unmarshalled_from_parse_tree.Verbose_Group(
                                            $,
                                            abort,
                                            {
                                                'expected properties': p_.literal.dictionary({
                                                    "properties": null,
                                                    "patternProperties": null,
                                                    "propertyNames": null,
                                                    "maxProperties": null,
                                                    "minProperties": null,
                                                    "required": null,
                                                    "dependentRequired": null,
                                                    "additionalProperties": null,
                                                }),
                                            },
                                        ),
                                        (
                                            $,
                                        ) => ({
                                            'properties': p_.change_context(
                                                r_unmarshalled_from_parse_tree.Property(
                                                    $,
                                                    abort,
                                                    {
                                                        'id': 'properties',
                                                    },
                                                ),
                                                (
                                                    $,
                                                ) => p_.change_context(
                                                    r_unmarshalled_from_parse_tree.Dictionary(
                                                        $,
                                                        abort,
                                                    ),
                                                    (
                                                        $,
                                                    ) => p_.from.dictionary($['entries']).map(
                                                        (
                                                            $,
                                                            id,
                                                        ) => Value(
                                                            $,
                                                            abort,
                                                        ),
                                                    ),
                                                ),
                                            ),
                                            'patternProperties': p_.change_context(
                                                r_unmarshalled_from_parse_tree.Property(
                                                    $,
                                                    abort,
                                                    {
                                                        'id': 'patternProperties',
                                                    },
                                                ),
                                                (
                                                    $,
                                                ) => p_.change_context(
                                                    r_unmarshalled_from_parse_tree.Dictionary(
                                                        $,
                                                        abort,
                                                    ),
                                                    (
                                                        $,
                                                    ) => p_.from.dictionary($['entries']).map(
                                                        (
                                                            $,
                                                            id,
                                                        ) => Value(
                                                            $,
                                                            abort,
                                                        ),
                                                    ),
                                                ),
                                            ),
                                            'propertyNames': p_.change_context(
                                                r_unmarshalled_from_parse_tree.Property(
                                                    $,
                                                    abort,
                                                    {
                                                        'id': 'propertyNames',
                                                    },
                                                ),
                                                (
                                                    $,
                                                ) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                                                    $,
                                                    abort,
                                                )['optional']).map(
                                                    (
                                                        $,
                                                    ) => Value(
                                                        $,
                                                        abort,
                                                    ),
                                                ),
                                            ),
                                            'maxProperties': p_.change_context(
                                                r_unmarshalled_from_parse_tree.Property(
                                                    $,
                                                    abort,
                                                    {
                                                        'id': 'maxProperties',
                                                    },
                                                ),
                                                (
                                                    $,
                                                ) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                                                    $,
                                                    abort,
                                                )['optional']).map(
                                                    (
                                                        $,
                                                    ) => r_unmarshalled_from_parse_tree.Number(
                                                        $,
                                                        abort,
                                                        {
                                                            'type': ['decimal', null],
                                                        },
                                                    ),
                                                ),
                                            ),
                                            'minProperties': p_.change_context(
                                                r_unmarshalled_from_parse_tree.Property(
                                                    $,
                                                    abort,
                                                    {
                                                        'id': 'minProperties',
                                                    },
                                                ),
                                                (
                                                    $,
                                                ) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                                                    $,
                                                    abort,
                                                )['optional']).map(
                                                    (
                                                        $,
                                                    ) => r_unmarshalled_from_parse_tree.Number(
                                                        $,
                                                        abort,
                                                        {
                                                            'type': ['decimal', null],
                                                        },
                                                    ),
                                                ),
                                            ),
                                            'required': p_.change_context(
                                                r_unmarshalled_from_parse_tree.Property(
                                                    $,
                                                    abort,
                                                    {
                                                        'id': 'required',
                                                    },
                                                ),
                                                (
                                                    $,
                                                ) => p_.from.list(r_unmarshalled_from_parse_tree.List(
                                                    $,
                                                    abort,
                                                )['items']).map(
                                                    (
                                                        $,
                                                    ) => p_.change_context(
                                                        $['value'],
                                                        (
                                                            $,
                                                        ) => r_unmarshalled_from_parse_tree.Text(
                                                            $,
                                                            abort,
                                                        ),
                                                    ),
                                                ),
                                            ),
                                            'dependentRequired': p_.change_context(
                                                r_unmarshalled_from_parse_tree.Property(
                                                    $,
                                                    abort,
                                                    {
                                                        'id': 'dependentRequired',
                                                    },
                                                ),
                                                (
                                                    $,
                                                ) => p_.change_context(
                                                    r_unmarshalled_from_parse_tree.Dictionary(
                                                        $,
                                                        abort,
                                                    ),
                                                    (
                                                        $,
                                                    ) => p_.from.dictionary($['entries']).map(
                                                        (
                                                            $,
                                                            id,
                                                        ) => p_.change_context(
                                                            r_unmarshalled_from_parse_tree.Dictionary(
                                                                $,
                                                                abort,
                                                            ),
                                                            (
                                                                $,
                                                            ) => p_.from.dictionary($['entries']).map(
                                                                (
                                                                    $,
                                                                    id,
                                                                ) => r_unmarshalled_from_parse_tree.Nothing(
                                                                    $,
                                                                    abort,
                                                                ),
                                                            ),
                                                        ),
                                                    ),
                                                ),
                                            ),
                                            'additionalProperties': p_.change_context(
                                                r_unmarshalled_from_parse_tree.Property(
                                                    $,
                                                    abort,
                                                    {
                                                        'id': 'additionalProperties',
                                                    },
                                                ),
                                                (
                                                    $,
                                                ) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                                                    $,
                                                    abort,
                                                )['optional']).map(
                                                    (
                                                        $,
                                                    ) => p_.change_context(
                                                        r_unmarshalled_from_parse_tree.State(
                                                            $,
                                                            abort,
                                                        ),
                                                        (
                                                            $,
                                                        ) => p_.from.text($['option']['token']['value']).to_state(
                                                            (
                                                                $text,
                                                            ): s_target.Value.constraint.O.object_.additionalProperties.O => {
                                                                switch ($text) {
                                                                    case "allowed": return p_.change_context(
                                                                        $['value'],
                                                                        (
                                                                            $,
                                                                        ) => ['allowed', r_unmarshalled_from_parse_tree.Nothing(
                                                                            $,
                                                                            abort,
                                                                        )],
                                                                    )
                                                                    case "forbidden": return p_.change_context(
                                                                        $['value'],
                                                                        (
                                                                            $,
                                                                        ) => ['forbidden', r_unmarshalled_from_parse_tree.Nothing(
                                                                            $,
                                                                            abort,
                                                                        )],
                                                                    )
                                                                    case "schema": return p_.change_context(
                                                                        $['value'],
                                                                        (
                                                                            $,
                                                                        ) => ['schema', Value(
                                                                            $,
                                                                            abort,
                                                                        )],
                                                                    )
                                                                    default: return abort(
                                                                        ['liana', {
                                                                            'type': ['state', ['unknown option', $['option']['token']['value']]],
                                                                            'range': $['option']['range'],
                                                                        }],
                                                                    )
                                                                }
                                                            },
                                                        ),
                                                    ),
                                                ),
                                            ),
                                        }),
                                    )],
                                )
                                case "array": return p_.change_context(
                                    $['value'],
                                    (
                                        $,
                                    ) => ['array', p_.change_context(
                                        r_unmarshalled_from_parse_tree.Verbose_Group(
                                            $,
                                            abort,
                                            {
                                                'expected properties': p_.literal.dictionary({
                                                    "items": null,
                                                    "maxItems": null,
                                                    "minItems": null,
                                                    "prefixItems": null,
                                                    "uniqueItems": null,
                                                    "maxContains": null,
                                                    "minContains": null,
                                                }),
                                            },
                                        ),
                                        (
                                            $,
                                        ) => ({
                                            'items': p_.change_context(
                                                r_unmarshalled_from_parse_tree.Property(
                                                    $,
                                                    abort,
                                                    {
                                                        'id': 'items',
                                                    },
                                                ),
                                                (
                                                    $,
                                                ) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                                                    $,
                                                    abort,
                                                )['optional']).map(
                                                    (
                                                        $,
                                                    ) => Value(
                                                        $,
                                                        abort,
                                                    ),
                                                ),
                                            ),
                                            'maxItems': p_.change_context(
                                                r_unmarshalled_from_parse_tree.Property(
                                                    $,
                                                    abort,
                                                    {
                                                        'id': 'maxItems',
                                                    },
                                                ),
                                                (
                                                    $,
                                                ) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                                                    $,
                                                    abort,
                                                )['optional']).map(
                                                    (
                                                        $,
                                                    ) => r_unmarshalled_from_parse_tree.Number(
                                                        $,
                                                        abort,
                                                        {
                                                            'type': ['decimal', null],
                                                        },
                                                    ),
                                                ),
                                            ),
                                            'minItems': p_.change_context(
                                                r_unmarshalled_from_parse_tree.Property(
                                                    $,
                                                    abort,
                                                    {
                                                        'id': 'minItems',
                                                    },
                                                ),
                                                (
                                                    $,
                                                ) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                                                    $,
                                                    abort,
                                                )['optional']).map(
                                                    (
                                                        $,
                                                    ) => r_unmarshalled_from_parse_tree.Number(
                                                        $,
                                                        abort,
                                                        {
                                                            'type': ['decimal', null],
                                                        },
                                                    ),
                                                ),
                                            ),
                                            'prefixItems': p_.change_context(
                                                r_unmarshalled_from_parse_tree.Property(
                                                    $,
                                                    abort,
                                                    {
                                                        'id': 'prefixItems',
                                                    },
                                                ),
                                                (
                                                    $,
                                                ) => p_.from.list(r_unmarshalled_from_parse_tree.List(
                                                    $,
                                                    abort,
                                                )['items']).map(
                                                    (
                                                        $,
                                                    ) => p_.change_context(
                                                        $['value'],
                                                        (
                                                            $,
                                                        ) => Value(
                                                            $,
                                                            abort,
                                                        ),
                                                    ),
                                                ),
                                            ),
                                            'uniqueItems': p_.change_context(
                                                r_unmarshalled_from_parse_tree.Property(
                                                    $,
                                                    abort,
                                                    {
                                                        'id': 'uniqueItems',
                                                    },
                                                ),
                                                (
                                                    $,
                                                ) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                                                    $,
                                                    abort,
                                                )['optional']).map(
                                                    (
                                                        $,
                                                    ) => r_unmarshalled_from_parse_tree.Boolean(
                                                        $,
                                                        abort,
                                                        {
                                                            'type': ['true/false', null],
                                                        },
                                                    ),
                                                ),
                                            ),
                                            'maxContains': p_.change_context(
                                                r_unmarshalled_from_parse_tree.Property(
                                                    $,
                                                    abort,
                                                    {
                                                        'id': 'maxContains',
                                                    },
                                                ),
                                                (
                                                    $,
                                                ) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                                                    $,
                                                    abort,
                                                )['optional']).map(
                                                    (
                                                        $,
                                                    ) => r_unmarshalled_from_parse_tree.Number(
                                                        $,
                                                        abort,
                                                        {
                                                            'type': ['decimal', null],
                                                        },
                                                    ),
                                                ),
                                            ),
                                            'minContains': p_.change_context(
                                                r_unmarshalled_from_parse_tree.Property(
                                                    $,
                                                    abort,
                                                    {
                                                        'id': 'minContains',
                                                    },
                                                ),
                                                (
                                                    $,
                                                ) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                                                    $,
                                                    abort,
                                                )['optional']).map(
                                                    (
                                                        $,
                                                    ) => r_unmarshalled_from_parse_tree.Number(
                                                        $,
                                                        abort,
                                                        {
                                                            'type': ['decimal', null],
                                                        },
                                                    ),
                                                ),
                                            ),
                                        }),
                                    )],
                                )
                                case "boolean": return p_.change_context(
                                    $['value'],
                                    (
                                        $,
                                    ) => ['boolean', r_unmarshalled_from_parse_tree.Nothing(
                                        $,
                                        abort,
                                    )],
                                )
                                case "null": return p_.change_context(
                                    $['value'],
                                    (
                                        $,
                                    ) => ['null', r_unmarshalled_from_parse_tree.Nothing(
                                        $,
                                        abort,
                                    )],
                                )
                                case "ref": return p_.change_context(
                                    $['value'],
                                    (
                                        $,
                                    ) => ['ref', p_.from.list(r_unmarshalled_from_parse_tree.List(
                                        $,
                                        abort,
                                    )['items']).map(
                                        (
                                            $,
                                        ) => p_.change_context(
                                            $['value'],
                                            (
                                                $,
                                            ) => r_unmarshalled_from_parse_tree.Text(
                                                $,
                                                abort,
                                            ),
                                        ),
                                    )],
                                )
                                case "string": return p_.change_context(
                                    $['value'],
                                    (
                                        $,
                                    ) => ['string', p_.change_context(
                                        r_unmarshalled_from_parse_tree.State(
                                            $,
                                            abort,
                                        ),
                                        (
                                            $,
                                        ) => p_.from.text($['option']['token']['value']).to_state(
                                            (
                                                $text,
                                            ): s_target.Value.constraint.O.string_ => {
                                                switch ($text) {
                                                    case "variable": return p_.change_context(
                                                        $['value'],
                                                        (
                                                            $,
                                                        ) => ['variable', p_.change_context(
                                                            r_unmarshalled_from_parse_tree.Verbose_Group(
                                                                $,
                                                                abort,
                                                                {
                                                                    'expected properties': p_.literal.dictionary({
                                                                        "maxLength": null,
                                                                        "minLength": null,
                                                                        "pattern": null,
                                                                        "format": null,
                                                                    }),
                                                                },
                                                            ),
                                                            (
                                                                $,
                                                            ) => ({
                                                                'maxLength': p_.change_context(
                                                                    r_unmarshalled_from_parse_tree.Property(
                                                                        $,
                                                                        abort,
                                                                        {
                                                                            'id': 'maxLength',
                                                                        },
                                                                    ),
                                                                    (
                                                                        $,
                                                                    ) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                                                                        $,
                                                                        abort,
                                                                    )['optional']).map(
                                                                        (
                                                                            $,
                                                                        ) => r_unmarshalled_from_parse_tree.Number(
                                                                            $,
                                                                            abort,
                                                                            {
                                                                                'type': ['decimal', null],
                                                                            },
                                                                        ),
                                                                    ),
                                                                ),
                                                                'minLength': p_.change_context(
                                                                    r_unmarshalled_from_parse_tree.Property(
                                                                        $,
                                                                        abort,
                                                                        {
                                                                            'id': 'minLength',
                                                                        },
                                                                    ),
                                                                    (
                                                                        $,
                                                                    ) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                                                                        $,
                                                                        abort,
                                                                    )['optional']).map(
                                                                        (
                                                                            $,
                                                                        ) => r_unmarshalled_from_parse_tree.Number(
                                                                            $,
                                                                            abort,
                                                                            {
                                                                                'type': ['decimal', null],
                                                                            },
                                                                        ),
                                                                    ),
                                                                ),
                                                                'pattern': p_.change_context(
                                                                    r_unmarshalled_from_parse_tree.Property(
                                                                        $,
                                                                        abort,
                                                                        {
                                                                            'id': 'pattern',
                                                                        },
                                                                    ),
                                                                    (
                                                                        $,
                                                                    ) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                                                                        $,
                                                                        abort,
                                                                    )['optional']).map(
                                                                        (
                                                                            $,
                                                                        ) => r_unmarshalled_from_parse_tree.Text(
                                                                            $,
                                                                            abort,
                                                                        ),
                                                                    ),
                                                                ),
                                                                'format': p_.change_context(
                                                                    r_unmarshalled_from_parse_tree.Property(
                                                                        $,
                                                                        abort,
                                                                        {
                                                                            'id': 'format',
                                                                        },
                                                                    ),
                                                                    (
                                                                        $,
                                                                    ) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                                                                        $,
                                                                        abort,
                                                                    )['optional']).map(
                                                                        (
                                                                            $,
                                                                        ) => r_unmarshalled_from_parse_tree.Text(
                                                                            $,
                                                                            abort,
                                                                        ),
                                                                    ),
                                                                ),
                                                            }),
                                                        )],
                                                    )
                                                    case "const": return p_.change_context(
                                                        $['value'],
                                                        (
                                                            $,
                                                        ) => ['const', r_unmarshalled_from_parse_tree.Text(
                                                            $,
                                                            abort,
                                                        )],
                                                    )
                                                    case "enum": return p_.change_context(
                                                        $['value'],
                                                        (
                                                            $,
                                                        ) => ['enum', p_.change_context(
                                                            r_unmarshalled_from_parse_tree.Dictionary(
                                                                $,
                                                                abort,
                                                            ),
                                                            (
                                                                $,
                                                            ) => p_.from.dictionary($['entries']).map(
                                                                (
                                                                    $,
                                                                    id,
                                                                ) => r_unmarshalled_from_parse_tree.Nothing(
                                                                    $,
                                                                    abort,
                                                                ),
                                                            ),
                                                        )],
                                                    )
                                                    default: return abort(
                                                        ['liana', {
                                                            'type': ['state', ['unknown option', $['option']['token']['value']]],
                                                            'range': $['option']['range'],
                                                        }],
                                                    )
                                                }
                                            },
                                        ),
                                    )],
                                )
                                case "integer": return p_.change_context(
                                    $['value'],
                                    (
                                        $,
                                    ) => ['integer', p_.change_context(
                                        r_unmarshalled_from_parse_tree.Verbose_Group(
                                            $,
                                            abort,
                                            {
                                                'expected properties': p_.literal.dictionary({
                                                    "maximum": null,
                                                    "minimum": null,
                                                    "multipleOf": null,
                                                }),
                                            },
                                        ),
                                        (
                                            $,
                                        ) => ({
                                            'maximum': p_.change_context(
                                                r_unmarshalled_from_parse_tree.Property(
                                                    $,
                                                    abort,
                                                    {
                                                        'id': 'maximum',
                                                    },
                                                ),
                                                (
                                                    $,
                                                ) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                                                    $,
                                                    abort,
                                                )['optional']).map(
                                                    (
                                                        $,
                                                    ) => p_.change_context(
                                                        r_unmarshalled_from_parse_tree.State(
                                                            $,
                                                            abort,
                                                        ),
                                                        (
                                                            $,
                                                        ) => p_.from.text($['option']['token']['value']).to_state(
                                                            (
                                                                $text,
                                                            ): s_target.Value.constraint.O.integer.maximum.O => {
                                                                switch ($text) {
                                                                    case "inclusive": return p_.change_context(
                                                                        $['value'],
                                                                        (
                                                                            $,
                                                                        ) => ['inclusive', r_unmarshalled_from_parse_tree.Number(
                                                                            $,
                                                                            abort,
                                                                            {
                                                                                'type': ['decimal', null],
                                                                            },
                                                                        )],
                                                                    )
                                                                    case "exclusive": return p_.change_context(
                                                                        $['value'],
                                                                        (
                                                                            $,
                                                                        ) => ['exclusive', r_unmarshalled_from_parse_tree.Number(
                                                                            $,
                                                                            abort,
                                                                            {
                                                                                'type': ['decimal', null],
                                                                            },
                                                                        )],
                                                                    )
                                                                    default: return abort(
                                                                        ['liana', {
                                                                            'type': ['state', ['unknown option', $['option']['token']['value']]],
                                                                            'range': $['option']['range'],
                                                                        }],
                                                                    )
                                                                }
                                                            },
                                                        ),
                                                    ),
                                                ),
                                            ),
                                            'minimum': p_.change_context(
                                                r_unmarshalled_from_parse_tree.Property(
                                                    $,
                                                    abort,
                                                    {
                                                        'id': 'minimum',
                                                    },
                                                ),
                                                (
                                                    $,
                                                ) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                                                    $,
                                                    abort,
                                                )['optional']).map(
                                                    (
                                                        $,
                                                    ) => p_.change_context(
                                                        r_unmarshalled_from_parse_tree.State(
                                                            $,
                                                            abort,
                                                        ),
                                                        (
                                                            $,
                                                        ) => p_.from.text($['option']['token']['value']).to_state(
                                                            (
                                                                $text,
                                                            ): s_target.Value.constraint.O.integer.minimum.O => {
                                                                switch ($text) {
                                                                    case "inclusive": return p_.change_context(
                                                                        $['value'],
                                                                        (
                                                                            $,
                                                                        ) => ['inclusive', r_unmarshalled_from_parse_tree.Number(
                                                                            $,
                                                                            abort,
                                                                            {
                                                                                'type': ['decimal', null],
                                                                            },
                                                                        )],
                                                                    )
                                                                    case "exclusive": return p_.change_context(
                                                                        $['value'],
                                                                        (
                                                                            $,
                                                                        ) => ['exclusive', r_unmarshalled_from_parse_tree.Number(
                                                                            $,
                                                                            abort,
                                                                            {
                                                                                'type': ['decimal', null],
                                                                            },
                                                                        )],
                                                                    )
                                                                    default: return abort(
                                                                        ['liana', {
                                                                            'type': ['state', ['unknown option', $['option']['token']['value']]],
                                                                            'range': $['option']['range'],
                                                                        }],
                                                                    )
                                                                }
                                                            },
                                                        ),
                                                    ),
                                                ),
                                            ),
                                            'multipleOf': p_.change_context(
                                                r_unmarshalled_from_parse_tree.Property(
                                                    $,
                                                    abort,
                                                    {
                                                        'id': 'multipleOf',
                                                    },
                                                ),
                                                (
                                                    $,
                                                ) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                                                    $,
                                                    abort,
                                                )['optional']).map(
                                                    (
                                                        $,
                                                    ) => r_unmarshalled_from_parse_tree.Number(
                                                        $,
                                                        abort,
                                                        {
                                                            'type': ['decimal', null],
                                                        },
                                                    ),
                                                ),
                                            ),
                                        }),
                                    )],
                                )
                                case "number": return p_.change_context(
                                    $['value'],
                                    (
                                        $,
                                    ) => ['number', p_.change_context(
                                        r_unmarshalled_from_parse_tree.Verbose_Group(
                                            $,
                                            abort,
                                            {
                                                'expected properties': p_.literal.dictionary({
                                                    "maximum": null,
                                                    "minimum": null,
                                                    "multipleOf": null,
                                                }),
                                            },
                                        ),
                                        (
                                            $,
                                        ) => ({
                                            'maximum': p_.change_context(
                                                r_unmarshalled_from_parse_tree.Property(
                                                    $,
                                                    abort,
                                                    {
                                                        'id': 'maximum',
                                                    },
                                                ),
                                                (
                                                    $,
                                                ) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                                                    $,
                                                    abort,
                                                )['optional']).map(
                                                    (
                                                        $,
                                                    ) => p_.change_context(
                                                        r_unmarshalled_from_parse_tree.State(
                                                            $,
                                                            abort,
                                                        ),
                                                        (
                                                            $,
                                                        ) => p_.from.text($['option']['token']['value']).to_state(
                                                            (
                                                                $text,
                                                            ): s_target.Value.constraint.O.number_.maximum.O => {
                                                                switch ($text) {
                                                                    case "inclusive": return p_.change_context(
                                                                        $['value'],
                                                                        (
                                                                            $,
                                                                        ) => ['inclusive', r_unmarshalled_from_parse_tree.Number(
                                                                            $,
                                                                            abort,
                                                                            {
                                                                                'type': ['decimal', null],
                                                                            },
                                                                        )],
                                                                    )
                                                                    case "exclusive": return p_.change_context(
                                                                        $['value'],
                                                                        (
                                                                            $,
                                                                        ) => ['exclusive', r_unmarshalled_from_parse_tree.Number(
                                                                            $,
                                                                            abort,
                                                                            {
                                                                                'type': ['decimal', null],
                                                                            },
                                                                        )],
                                                                    )
                                                                    default: return abort(
                                                                        ['liana', {
                                                                            'type': ['state', ['unknown option', $['option']['token']['value']]],
                                                                            'range': $['option']['range'],
                                                                        }],
                                                                    )
                                                                }
                                                            },
                                                        ),
                                                    ),
                                                ),
                                            ),
                                            'minimum': p_.change_context(
                                                r_unmarshalled_from_parse_tree.Property(
                                                    $,
                                                    abort,
                                                    {
                                                        'id': 'minimum',
                                                    },
                                                ),
                                                (
                                                    $,
                                                ) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                                                    $,
                                                    abort,
                                                )['optional']).map(
                                                    (
                                                        $,
                                                    ) => p_.change_context(
                                                        r_unmarshalled_from_parse_tree.State(
                                                            $,
                                                            abort,
                                                        ),
                                                        (
                                                            $,
                                                        ) => p_.from.text($['option']['token']['value']).to_state(
                                                            (
                                                                $text,
                                                            ): s_target.Value.constraint.O.number_.minimum.O => {
                                                                switch ($text) {
                                                                    case "inclusive": return p_.change_context(
                                                                        $['value'],
                                                                        (
                                                                            $,
                                                                        ) => ['inclusive', r_unmarshalled_from_parse_tree.Number(
                                                                            $,
                                                                            abort,
                                                                            {
                                                                                'type': ['decimal', null],
                                                                            },
                                                                        )],
                                                                    )
                                                                    case "exclusive": return p_.change_context(
                                                                        $['value'],
                                                                        (
                                                                            $,
                                                                        ) => ['exclusive', r_unmarshalled_from_parse_tree.Number(
                                                                            $,
                                                                            abort,
                                                                            {
                                                                                'type': ['decimal', null],
                                                                            },
                                                                        )],
                                                                    )
                                                                    default: return abort(
                                                                        ['liana', {
                                                                            'type': ['state', ['unknown option', $['option']['token']['value']]],
                                                                            'range': $['option']['range'],
                                                                        }],
                                                                    )
                                                                }
                                                            },
                                                        ),
                                                    ),
                                                ),
                                            ),
                                            'multipleOf': p_.change_context(
                                                r_unmarshalled_from_parse_tree.Property(
                                                    $,
                                                    abort,
                                                    {
                                                        'id': 'multipleOf',
                                                    },
                                                ),
                                                (
                                                    $,
                                                ) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                                                    $,
                                                    abort,
                                                )['optional']).map(
                                                    (
                                                        $,
                                                    ) => r_unmarshalled_from_parse_tree.Number(
                                                        $,
                                                        abort,
                                                        {
                                                            'type': ['scientific notation', {
                                                                'precision': 10,
                                                            }],
                                                        },
                                                    ),
                                                ),
                                            ),
                                        }),
                                    )],
                                )
                                default: return abort(
                                    ['liana', {
                                        'type': ['state', ['unknown option', $['option']['token']['value']]],
                                        'range': $['option']['range'],
                                    }],
                                )
                            }
                        },
                    ),
                ),
            ),
        ),
    }),
)

export const Definitions: declarations.Definitions = (
    $,
    abort,
) => p_.change_context(
    r_unmarshalled_from_parse_tree.Dictionary(
        $,
        abort,
    ),
    (
        $,
    ) => p_.from.dictionary($['entries']).map(
        (
            $,
            id,
        ) => p_.change_context(
            r_unmarshalled_from_parse_tree.State(
                $,
                abort,
            ),
            (
                $,
            ) => p_.from.text($['option']['token']['value']).to_state(
                (
                    $text,
                ): s_target.Definitions.D => {
                    switch ($text) {
                        case "value": return p_.change_context(
                            $['value'],
                            (
                                $,
                            ) => ['value', Value(
                                $,
                                abort,
                            )],
                        )
                        case "namespace": return p_.change_context(
                            $['value'],
                            (
                                $,
                            ) => ['namespace', Definitions(
                                $,
                                abort,
                            )],
                        )
                        default: return abort(
                            ['liana', {
                                'type': ['state', ['unknown option', $['option']['token']['value']]],
                                'range': $['option']['range'],
                            }],
                        )
                    }
                },
            ),
        ),
    ),
)

export const Document: declarations.Document = (
    $,
    abort,
) => p_.change_context(
    r_unmarshalled_from_parse_tree.Verbose_Group(
        $,
        abort,
        {
            'expected properties': p_.literal.dictionary({
                "schema": null,
                "id": null,
                "defs": null,
                "root value": null,
            }),
        },
    ),
    (
        $,
    ) => ({
        'schema': p_.change_context(
            r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'schema',
                },
            ),
            (
                $,
            ) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                $,
                abort,
            )['optional']).map(
                (
                    $,
                ) => r_unmarshalled_from_parse_tree.Text(
                    $,
                    abort,
                ),
            ),
        ),
        'id': p_.change_context(
            r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'id',
                },
            ),
            (
                $,
            ) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                $,
                abort,
            )['optional']).map(
                (
                    $,
                ) => r_unmarshalled_from_parse_tree.Text(
                    $,
                    abort,
                ),
            ),
        ),
        'defs': p_.change_context(
            r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'defs',
                },
            ),
            (
                $,
            ) => Definitions(
                $,
                abort,
            ),
        ),
        'root value': p_.change_context(
            r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'root value',
                },
            ),
            (
                $,
            ) => p_.from.optional(r_unmarshalled_from_parse_tree.Optional(
                $,
                abort,
            )['optional']).map(
                (
                    $,
                ) => Value(
                    $,
                    abort,
                ),
            ),
        ),
    }),
)

export const Root: declarations.Root = (
    $,
    abort,
) => Document(
    $,
    abort,
)
