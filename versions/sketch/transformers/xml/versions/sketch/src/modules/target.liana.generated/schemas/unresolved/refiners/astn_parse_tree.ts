import * as p_ from 'pareto-core/refiner'

// schemas
import * as s_target from "../schema.js"
import * as s_source from "astn-runtime/modules/deserialization/schemas/parse_tree/schema"
import * as s_error from "liana-runtime/modules/value_unmarshalling/schemas/unmarshalling/schema"

// refiner dependencies
import * as r_unmarshalled_from_parse_tree from "liana-runtime/modules/value_unmarshalling/schemas/unmarshalled_value/refiners/astn_parse_tree"

export namespace declarations {
    
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
    
    export type Element = p_.Refiner<
        s_target.Element,
        s_error.Error,
        s_source.Value
    >
    
    export type Mixed_Content = p_.Refiner<
        s_target.Mixed_Content,
        s_error.Error,
        s_source.Value
    >
    
    export type Node = p_.Refiner<
        s_target.Node,
        s_error.Error,
        s_source.Value
    >
    
    export type Qualified_Name = p_.Refiner<
        s_target.Qualified_Name,
        s_error.Error,
        s_source.Value
    >
}

// implementations

export const Document: declarations.Document = (
    $,
    abort,
) => p_.change_context(
    r_unmarshalled_from_parse_tree.Verbose_Group(
        $,
        abort,
        {
            'expected properties': p_.literal.dictionary({
                "doc type": null,
                "root": null,
            }),
        },
    ),
    (
        $,
    ) => ({
        'doc type': p_.change_context(
            r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'doc type',
                },
            ),
            (
                $,
            ) => r_unmarshalled_from_parse_tree.Text(
                $,
                abort,
            ),
        ),
        'root': p_.change_context(
            r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'root',
                },
            ),
            (
                $,
            ) => Element(
                $,
                abort,
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

export const Element: declarations.Element = (
    $,
    abort,
) => p_.change_context(
    r_unmarshalled_from_parse_tree.Verbose_Group(
        $,
        abort,
        {
            'expected properties': p_.literal.dictionary({
                "name": null,
                "attributes": null,
                "content type": null,
            }),
        },
    ),
    (
        $,
    ) => ({
        'name': p_.change_context(
            r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'name',
                },
            ),
            (
                $,
            ) => Qualified_Name(
                $,
                abort,
            ),
        ),
        'attributes': p_.change_context(
            r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'attributes',
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
                    ) => p_.change_context(
                        r_unmarshalled_from_parse_tree.Verbose_Group(
                            $,
                            abort,
                            {
                                'expected properties': p_.literal.dictionary({
                                    "name": null,
                                    "value": null,
                                }),
                            },
                        ),
                        (
                            $,
                        ) => ({
                            'name': p_.change_context(
                                r_unmarshalled_from_parse_tree.Property(
                                    $,
                                    abort,
                                    {
                                        'id': 'name',
                                    },
                                ),
                                (
                                    $,
                                ) => Qualified_Name(
                                    $,
                                    abort,
                                ),
                            ),
                            'value': p_.change_context(
                                r_unmarshalled_from_parse_tree.Property(
                                    $,
                                    abort,
                                    {
                                        'id': 'value',
                                    },
                                ),
                                (
                                    $,
                                ) => r_unmarshalled_from_parse_tree.Text(
                                    $,
                                    abort,
                                ),
                            ),
                        }),
                    ),
                ),
            ),
        ),
        'content type': p_.change_context(
            r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'content type',
                },
            ),
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
                    ): s_target.Element.content_type => {
                        switch ($text) {
                            case "empty": return p_.change_context(
                                $['value'],
                                (
                                    $,
                                ) => ['empty', r_unmarshalled_from_parse_tree.Nothing(
                                    $,
                                    abort,
                                )],
                            )
                            case "text only": return p_.change_context(
                                $['value'],
                                (
                                    $,
                                ) => ['text only', p_.change_context(
                                    r_unmarshalled_from_parse_tree.Verbose_Group(
                                        $,
                                        abort,
                                        {
                                            'expected properties': p_.literal.dictionary({
                                                "value": null,
                                            }),
                                        },
                                    ),
                                    (
                                        $,
                                    ) => ({
                                        'value': p_.change_context(
                                            r_unmarshalled_from_parse_tree.Property(
                                                $,
                                                abort,
                                                {
                                                    'id': 'value',
                                                },
                                            ),
                                            (
                                                $,
                                            ) => r_unmarshalled_from_parse_tree.Text(
                                                $,
                                                abort,
                                            ),
                                        ),
                                    }),
                                )],
                            )
                            case "mixed": return p_.change_context(
                                $['value'],
                                (
                                    $,
                                ) => ['mixed', Mixed_Content(
                                    $,
                                    abort,
                                )],
                            )
                            case "nodes only": return p_.change_context(
                                $['value'],
                                (
                                    $,
                                ) => ['nodes only', p_.change_context(
                                    r_unmarshalled_from_parse_tree.Verbose_Group(
                                        $,
                                        abort,
                                        {
                                            'expected properties': p_.literal.dictionary({
                                                "children": null,
                                            }),
                                        },
                                    ),
                                    (
                                        $,
                                    ) => ({
                                        'children': p_.change_context(
                                            r_unmarshalled_from_parse_tree.Property(
                                                $,
                                                abort,
                                                {
                                                    'id': 'children',
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
                                                    ) => Node(
                                                        $,
                                                        abort,
                                                    ),
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
    }),
)

export const Mixed_Content: declarations.Mixed_Content = (
    $,
    abort,
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
                ): s_target.Mixed_Content.L => {
                    switch ($text) {
                        case "node": return p_.change_context(
                            $['value'],
                            (
                                $,
                            ) => ['node', Node(
                                $,
                                abort,
                            )],
                        )
                        case "text": return p_.change_context(
                            $['value'],
                            (
                                $,
                            ) => ['text', p_.change_context(
                                r_unmarshalled_from_parse_tree.Verbose_Group(
                                    $,
                                    abort,
                                    {
                                        'expected properties': p_.literal.dictionary({
                                            "value": null,
                                        }),
                                    },
                                ),
                                (
                                    $,
                                ) => ({
                                    'value': p_.change_context(
                                        r_unmarshalled_from_parse_tree.Property(
                                            $,
                                            abort,
                                            {
                                                'id': 'value',
                                            },
                                        ),
                                        (
                                            $,
                                        ) => r_unmarshalled_from_parse_tree.Text(
                                            $,
                                            abort,
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
)

export const Node: declarations.Node = (
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
        ): s_target.Node => {
            switch ($text) {
                case "element": return p_.change_context(
                    $['value'],
                    (
                        $,
                    ) => ['element', Element(
                        $,
                        abort,
                    )],
                )
                case "comment": return p_.change_context(
                    $['value'],
                    (
                        $,
                    ) => ['comment', r_unmarshalled_from_parse_tree.Text(
                        $,
                        abort,
                    )],
                )
                case "cdata": return p_.change_context(
                    $['value'],
                    (
                        $,
                    ) => ['cdata', r_unmarshalled_from_parse_tree.Text(
                        $,
                        abort,
                    )],
                )
                case "processing instruction": return p_.change_context(
                    $['value'],
                    (
                        $,
                    ) => ['processing instruction', p_.change_context(
                        r_unmarshalled_from_parse_tree.Verbose_Group(
                            $,
                            abort,
                            {
                                'expected properties': p_.literal.dictionary({
                                    "target": null,
                                    "data": null,
                                }),
                            },
                        ),
                        (
                            $,
                        ) => ({
                            'target': p_.change_context(
                                r_unmarshalled_from_parse_tree.Property(
                                    $,
                                    abort,
                                    {
                                        'id': 'target',
                                    },
                                ),
                                (
                                    $,
                                ) => r_unmarshalled_from_parse_tree.Text(
                                    $,
                                    abort,
                                ),
                            ),
                            'data': p_.change_context(
                                r_unmarshalled_from_parse_tree.Property(
                                    $,
                                    abort,
                                    {
                                        'id': 'data',
                                    },
                                ),
                                (
                                    $,
                                ) => r_unmarshalled_from_parse_tree.Text(
                                    $,
                                    abort,
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
)

export const Qualified_Name: declarations.Qualified_Name = (
    $,
    abort,
) => p_.change_context(
    r_unmarshalled_from_parse_tree.Verbose_Group(
        $,
        abort,
        {
            'expected properties': p_.literal.dictionary({
                "namespace prefix": null,
                "local name": null,
            }),
        },
    ),
    (
        $,
    ) => ({
        'namespace prefix': p_.change_context(
            r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'namespace prefix',
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
        'local name': p_.change_context(
            r_unmarshalled_from_parse_tree.Property(
                $,
                abort,
                {
                    'id': 'local name',
                },
            ),
            (
                $,
            ) => r_unmarshalled_from_parse_tree.Text(
                $,
                abort,
            ),
        ),
    }),
)
