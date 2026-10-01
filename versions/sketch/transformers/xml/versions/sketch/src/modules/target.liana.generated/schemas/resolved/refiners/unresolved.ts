import * as p_ from 'pareto-core/refiner'

// schemas
import * as s_target from "../schema.js"
import * as s_source from "../../unresolved/schema.js"
import * as s_error from "liana-runtime/modules/resolved_document_deserialization/schemas/resolving/schema"

export namespace declarations {
    
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
    
    export type Element = p_.Refiner<
        s_target.Element,
        s_error.Error,
        s_source.Element
    >
    
    export type Mixed_Content = p_.Refiner<
        s_target.Mixed_Content,
        s_error.Error,
        s_source.Mixed_Content
    >
    
    export type Node = p_.Refiner<
        s_target.Node,
        s_error.Error,
        s_source.Node
    >
    
    export type Qualified_Name = p_.Refiner<
        s_target.Qualified_Name,
        s_error.Error,
        s_source.Qualified_Name
    >
}

// implementations

export const Document: declarations.Document = (
    $,
    abort,
) => ({
    'doc type': p_.change_context(
        $['doc type'],
        (
            $,
        ) => $,
    ),
    'root': p_.change_context(
        $['root'],
        (
            $,
        ) => Element(
            $,
            abort,
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

export const Element: declarations.Element = (
    $,
    abort,
) => ({
    'name': p_.change_context(
        $['name'],
        (
            $,
        ) => Qualified_Name(
            $,
            abort,
        ),
    ),
    'attributes': p_.change_context(
        $['attributes'],
        (
            $,
        ) => p_.from.list($).map(
            (
                $,
            ) => ({
                'name': p_.change_context(
                    $['name'],
                    (
                        $,
                    ) => Qualified_Name(
                        $,
                        abort,
                    ),
                ),
                'value': p_.change_context(
                    $['value'],
                    (
                        $,
                    ) => $,
                ),
            }),
        ),
    ),
    'content type': p_.change_context(
        $['content type'],
        (
            $,
        ) => p_.from.state($).decide(
            (
                $,
            ): s_target.Element.content_type => {
                switch ($[0]) {
                    case 'empty': return p_.option($, (
                        $,
                    ) => p_.change_context(
                        $,
                        (
                            $,
                        ) => ['empty', null],
                    ))
                    case 'text only': return p_.option($, (
                        $,
                    ) => p_.change_context(
                        $,
                        (
                            $,
                        ) => ['text only', {
                            'value': p_.change_context(
                                $['value'],
                                (
                                    $,
                                ) => $,
                            ),
                        }],
                    ))
                    case 'mixed': return p_.option($, (
                        $,
                    ) => p_.change_context(
                        $,
                        (
                            $,
                        ) => ['mixed', Mixed_Content(
                            $,
                            abort,
                        )],
                    ))
                    case 'nodes only': return p_.option($, (
                        $,
                    ) => p_.change_context(
                        $,
                        (
                            $,
                        ) => ['nodes only', {
                            'children': p_.change_context(
                                $['children'],
                                (
                                    $,
                                ) => p_.from.list($).map(
                                    (
                                        $,
                                    ) => Node(
                                        $,
                                        abort,
                                    ),
                                ),
                            ),
                        }],
                    ))
                    default: return p_.exhaustive($[0])
                }
            },
        ),
    ),
})

export const Mixed_Content: declarations.Mixed_Content = (
    $,
    abort,
) => p_.from.list($).map(
    (
        $,
    ) => p_.from.state($).decide(
        (
            $,
        ): s_target.Mixed_Content.L => {
            switch ($[0]) {
                case 'node': return p_.option($, (
                    $,
                ) => p_.change_context(
                    $,
                    (
                        $,
                    ) => ['node', Node(
                        $,
                        abort,
                    )],
                ))
                case 'text': return p_.option($, (
                    $,
                ) => p_.change_context(
                    $,
                    (
                        $,
                    ) => ['text', {
                        'value': p_.change_context(
                            $['value'],
                            (
                                $,
                            ) => $,
                        ),
                    }],
                ))
                default: return p_.exhaustive($[0])
            }
        },
    ),
)

export const Node: declarations.Node = (
    $,
    abort,
) => p_.from.state($).decide(
    (
        $,
    ): s_target.Node => {
        switch ($[0]) {
            case 'element': return p_.option($, (
                $,
            ) => p_.change_context(
                $,
                (
                    $,
                ) => ['element', Element(
                    $,
                    abort,
                )],
            ))
            case 'comment': return p_.option($, (
                $,
            ) => p_.change_context(
                $,
                (
                    $,
                ) => ['comment', $],
            ))
            case 'cdata': return p_.option($, (
                $,
            ) => p_.change_context(
                $,
                (
                    $,
                ) => ['cdata', $],
            ))
            case 'processing instruction': return p_.option($, (
                $,
            ) => p_.change_context(
                $,
                (
                    $,
                ) => ['processing instruction', {
                    'target': p_.change_context(
                        $['target'],
                        (
                            $,
                        ) => $,
                    ),
                    'data': p_.change_context(
                        $['data'],
                        (
                            $,
                        ) => $,
                    ),
                }],
            ))
            default: return p_.exhaustive($[0])
        }
    },
)

export const Qualified_Name: declarations.Qualified_Name = (
    $,
    abort,
) => ({
    'namespace prefix': p_.change_context(
        $['namespace prefix'],
        (
            $,
        ) => p_.from.optional($).map(
            (
                $,
            ) => $,
        ),
    ),
    'local name': p_.change_context(
        $['local name'],
        (
            $,
        ) => $,
    ),
})
