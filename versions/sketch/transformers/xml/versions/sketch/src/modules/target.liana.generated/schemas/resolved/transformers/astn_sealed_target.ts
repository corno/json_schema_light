import * as p_ from 'pareto-core/transformer'

// schemas
import * as s_source from "../schema.js"
import * as s_target from "astn-runtime/modules/serialization/schemas/sealed_target/schema"

// serializer dependencies
import * as ser_primitives from "liana-runtime/modules/serialization/schemas/primitives/serializers"

export namespace declarations {
    
    export type Document = p_.Transformer<
        s_source.Document,
        s_target.Value
    >
    
    export type Root = p_.Transformer<
        s_source.Root,
        s_target.Value
    >
    
    export type Element = p_.Transformer<
        s_source.Element,
        s_target.Value
    >
    
    export type Mixed_Content = p_.Transformer<
        s_source.Mixed_Content,
        s_target.Value
    >
    
    export type Node = p_.Transformer<
        s_source.Node,
        s_target.Value
    >
    
    export type Qualified_Name = p_.Transformer<
        s_source.Qualified_Name,
        s_target.Value
    >
}

// implementations

export const Document: declarations.Document = (
    $,
) => ['group', ['verbose', p_.literal.dictionary({
    "doc type": p_.change_context(
        $['doc type'],
        (
            $,
        ) => ['text', {
            'delimiter': ['quote', null],
            'value': $,
        }],
    ),
    "root": p_.change_context(
        $['root'],
        (
            $,
        ) => Element(
            $,
        ),
    ),
})]]

export const Root: declarations.Root = (
    $,
) => Document(
    $,
)

export const Element: declarations.Element = (
    $,
) => ['group', ['verbose', p_.literal.dictionary({
    "name": p_.change_context(
        $['name'],
        (
            $,
        ) => Qualified_Name(
            $,
        ),
    ),
    "attributes": p_.change_context(
        $['attributes'],
        (
            $,
        ) => ['list', p_.from.list($).map(
            (
                $,
            ) => ['group', ['verbose', p_.literal.dictionary({
                "name": p_.change_context(
                    $['name'],
                    (
                        $,
                    ) => Qualified_Name(
                        $,
                    ),
                ),
                "value": p_.change_context(
                    $['value'],
                    (
                        $,
                    ) => ['text', {
                        'delimiter': ['quote', null],
                        'value': $,
                    }],
                ),
            })]],
        )],
    ),
    "content type": p_.change_context(
        $['content type'],
        (
            $,
        ) => ['state', p_.from.state($).decide(
            (
                $,
            ): s_target.Value.state => {
                switch ($[0]) {
                    case 'empty': return p_.option($, (
                        $,
                    ) => ({
                        'option': 'empty',
                        'value': ['nothing', null],
                    }))
                    case 'text only': return p_.option($, (
                        $,
                    ) => ({
                        'option': 'text only',
                        'value': ['group', ['verbose', p_.literal.dictionary({
                            "value": p_.change_context(
                                $['value'],
                                (
                                    $,
                                ) => ['text', {
                                    'delimiter': ['quote', null],
                                    'value': $,
                                }],
                            ),
                        })]],
                    }))
                    case 'mixed': return p_.option($, (
                        $,
                    ) => ({
                        'option': 'mixed',
                        'value': Mixed_Content(
                            $,
                        ),
                    }))
                    case 'nodes only': return p_.option($, (
                        $,
                    ) => ({
                        'option': 'nodes only',
                        'value': ['group', ['verbose', p_.literal.dictionary({
                            "children": p_.change_context(
                                $['children'],
                                (
                                    $,
                                ) => ['list', p_.from.list($).map(
                                    (
                                        $,
                                    ) => Node(
                                        $,
                                    ),
                                )],
                            ),
                        })]],
                    }))
                    default: return p_.exhaustive($[0])
                }
            },
        )],
    ),
})]]

export const Mixed_Content: declarations.Mixed_Content = (
    $,
) => ['list', p_.from.list($).map(
    (
        $,
    ) => ['state', p_.from.state($).decide(
        (
            $,
        ): s_target.Value.state => {
            switch ($[0]) {
                case 'node': return p_.option($, (
                    $,
                ) => ({
                    'option': 'node',
                    'value': Node(
                        $,
                    ),
                }))
                case 'text': return p_.option($, (
                    $,
                ) => ({
                    'option': 'text',
                    'value': ['group', ['verbose', p_.literal.dictionary({
                        "value": p_.change_context(
                            $['value'],
                            (
                                $,
                            ) => ['text', {
                                'delimiter': ['quote', null],
                                'value': $,
                            }],
                        ),
                    })]],
                }))
                default: return p_.exhaustive($[0])
            }
        },
    )],
)]

export const Node: declarations.Node = (
    $,
) => ['state', p_.from.state($).decide(
    (
        $,
    ): s_target.Value.state => {
        switch ($[0]) {
            case 'element': return p_.option($, (
                $,
            ) => ({
                'option': 'element',
                'value': Element(
                    $,
                ),
            }))
            case 'comment': return p_.option($, (
                $,
            ) => ({
                'option': 'comment',
                'value': ['text', {
                    'delimiter': ['quote', null],
                    'value': $,
                }],
            }))
            case 'cdata': return p_.option($, (
                $,
            ) => ({
                'option': 'cdata',
                'value': ['text', {
                    'delimiter': ['quote', null],
                    'value': $,
                }],
            }))
            case 'processing instruction': return p_.option($, (
                $,
            ) => ({
                'option': 'processing instruction',
                'value': ['group', ['verbose', p_.literal.dictionary({
                    "target": p_.change_context(
                        $['target'],
                        (
                            $,
                        ) => ['text', {
                            'delimiter': ['quote', null],
                            'value': $,
                        }],
                    ),
                    "data": p_.change_context(
                        $['data'],
                        (
                            $,
                        ) => ['text', {
                            'delimiter': ['quote', null],
                            'value': $,
                        }],
                    ),
                })]],
            }))
            default: return p_.exhaustive($[0])
        }
    },
)]

export const Qualified_Name: declarations.Qualified_Name = (
    $,
) => ['group', ['verbose', p_.literal.dictionary({
    "namespace prefix": p_.change_context(
        $['namespace prefix'],
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
    "local name": p_.change_context(
        $['local name'],
        (
            $,
        ) => ['text', {
            'delimiter': ['quote', null],
            'value': $,
        }],
    ),
})]]
