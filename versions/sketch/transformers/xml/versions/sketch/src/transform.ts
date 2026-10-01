import * as p_ from 'pareto-core/transformer'
import * as p_s from 'pareto-core/serializer'

//schemas
import type * as s_source from "./modules/source.liana.generated/schemas/unresolved/schema.js"
import type * as s_target from "./modules/target.liana.generated/schemas/unresolved/schema.js"

namespace declarations {
    export type Root = p_.Transformer<
        s_source.Root,
        s_target.Root
    >
    export type Document = p_.Transformer<
        s_source.Document,
        s_target.Document
    >
    export type Flow_Element = p_.Transformer<
        s_source.Flow_Element,
        s_target.Element.content_type.nodes_only.children.L
    >
    export type Flow_Content = p_.Transformer<
        s_source.Flow_Content,
        s_target.Element.content_type.nodes_only.children
    >
    export type Classes = p_.Transformer<
        s_source.Classes,
        s_target.Element.attributes
    >
    export type Phrasing_Content = p_.Transformer<
        s_source.Phrasing_Content,
        s_target.Mixed_Content
    >
    export type Phrasing_Element = p_.Transformer<
        s_source.Phrasing_Element,
        s_target.Element
    >
}

//shorthands
import * as sh from "./shorthands.js"


const SER_natural: p_s.Serializer<number> = ($) => `${$}`

export const Root: declarations.Root = ($) => Document($)

export const Document: declarations.Document = ($) => sh.Document(
    p_.literal.set({
        'name': "html"
    }),
    sh.Element(
        sh.Qualified_Name(
            p_.literal.not_set(),
            "html",
        ),
        p_.literal.list([]),
        ['nodes only', {
            'children': p_.literal.list([
                ['element', sh.Element(
                    sh.Qualified_Name(
                        p_.literal.not_set(),
                        "head",
                    ),
                    p_.literal.list([]),
                    ['nodes only', {
                        'children': p_.literal.list([
                            ['element', sh.Element(
                                sh.Qualified_Name(
                                    p_.literal.not_set(),
                                    "meta",
                                ),
                                p_.literal.list([
                                    sh.Element.Attributes.L(
                                        sh.Qualified_Name(
                                            p_.literal.not_set(),
                                            "charset",
                                        ),
                                        "UTF-8",
                                    ),
                                ]),
                                ['empty', null]
                            )],
                            ['element', sh.Element(
                                sh.Qualified_Name(
                                    p_.literal.not_set(),
                                    "meta",
                                ),
                                p_.literal.list([
                                    sh.Element.Attributes.L(
                                        sh.Qualified_Name(
                                            p_.literal.not_set(),
                                            "name",
                                        ),
                                        "viewport",
                                    ),
                                    sh.Element.Attributes.L(
                                        sh.Qualified_Name(
                                            p_.literal.not_set(),
                                            "content",
                                        ),
                                        "width=device-width, initial-scale=1.0",
                                    ),
                                ]),
                                ['empty', null]
                            )],
                            ['element', sh.Element(
                                sh.Qualified_Name(
                                    p_.literal.not_set(),
                                    "style",
                                ),
                                p_.literal.list([]),
                                ['text only', {
                                    'value': $.css
                                }]
                            )],
                        ]),
                    }]
                )],
                ['element', sh.Element(
                    sh.Qualified_Name(
                        p_.literal.not_set(),
                        "body",
                    ),
                    p_.literal.list([]),
                    ['nodes only', {
                        'children': p_.literal.list([
                            Flow_Element($.root)
                        ])
                    }]
                )]
            ]),
        }]
    )
)

export const Flow_Element: declarations.Flow_Element = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'div': return p_.option($, ($) => ['element', sh.Element(
                sh.Qualified_Name(p_.literal.not_set(), "div"),
                p_.literal.list([]),
                ['nodes only', { 'children': Flow_Content($) }]
            )])
            case 'dimensioned div': return p_.option($, ($) => ['element', sh.Element(
                sh.Qualified_Name(p_.literal.not_set(), "div"),
                p_.literal.segmented_list([
                    p_.from.optional($.width).decide(
                        ($) => p_.literal.list([
                            sh.Element.Attributes.L(
                                sh.Qualified_Name(p_.literal.not_set(), "width"),
                                SER_natural($),
                            ),
                        ]),
                        () => p_.literal.list([])
                    ),
                    p_.from.optional($.height).decide(
                        ($) => p_.literal.list([
                            sh.Element.Attributes.L(
                                sh.Qualified_Name(p_.literal.not_set(), "height"),
                                SER_natural($),
                            ),
                        ]),
                        () => p_.literal.list([])
                    )
                ]),
                ['nodes only', { 'children': Flow_Content($.content) }]
            )])
            case 'classified div': return p_.option($, ($) => ['element', sh.Element(
                sh.Qualified_Name(p_.literal.not_set(), "div"),
                Classes($.classes),
                ['nodes only', { 'children': Flow_Content($.content) }]
            )])
            case 'table': return p_.option($, ($) => ['element', sh.Element(
                sh.Qualified_Name(p_.literal.not_set(), "table"),
                Classes($.classes),
                ['nodes only', { 'children': p_.from.list($.sections).map(
                    ($) => ['element', sh.Element(
                        sh.Qualified_Name(
                            p_.literal.not_set(),
                            p_.from.state($.type).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'header': return p_.option($, ($) => "thead")
                                        case 'body': return p_.option($, ($) => "tbody")
                                        case 'footer': return p_.option($, ($) => "tfoot")
                                        default: return p_.exhaustive($[0])
                                    }
                                }
                            )
                        ),
                        Classes($.classes),
                        ['nodes only', { 'children': p_.from.list($.rows).map(
                            ($) => ['element', sh.Element(
                                sh.Qualified_Name(p_.literal.not_set(), "tr"),
                                p_.literal.segmented_list([
                                    Classes($.classes),
                                    p_.from.optional($.height).decide(
                                        ($) => p_.literal.list([
                                            sh.attribute_deprecated("height", SER_natural($)),
                                        ]),
                                        () => p_.literal.list([])
                                    ),
                                ]),
                                ['nodes only', { 'children': p_.from.list($.cells).map(
                                    ($) => ['element', sh.Element(
                                        sh.Qualified_Name(
                                            p_.literal.not_set(),
                                            p_.from.state($.type).decide(
                                                ($) => {
                                                    switch ($[0]) {
                                                        case 'th': return p_.option($, ($) => "th")
                                                        case 'td': return p_.option($, ($) => "td")
                                                        default: return p_.exhaustive($[0])
                                                    }
                                                }
                                            )
                                        ),
                                        p_.literal.segmented_list([
                                            Classes($.classes),
                                            p_.from.optional($.colspan).decide(
                                                ($) => p_.literal.list([
                                                    sh.attribute_deprecated("colspan", SER_natural($)),
                                                ]),
                                                () => p_.literal.list([])
                                            ),
                                        ]),
                                        ['nodes only', { 'children': Flow_Content($.content) }]
                                    )]
                                ) }]
                            )]
                        ) }]
                    )]
                ) }]
            )])
            case 'span': return p_.option($, ($) => ['element', sh.Element(
                sh.Qualified_Name(p_.literal.not_set(), "span"),
                p_.literal.list([]),
                ['mixed', Phrasing_Content($)]
            )])
            case 'label': return p_.option($, ($) => ['element', sh.Element(
                sh.Qualified_Name(p_.literal.not_set(), "label"),
                Classes($.classes),
                ['mixed', p_.literal.list([
                    ['text', { 'value': $.text }],
                    ['node', ['element', sh.Element(
                        sh.Qualified_Name(p_.literal.not_set(), "div"),
                        p_.literal.list([]),
                        ['nodes only', { 'children': Flow_Content($.content) }]
                    )]]
                ])]
            )])
            case 'img': return p_.option($, ($) => ['element', sh.Element(
                sh.Qualified_Name(p_.literal.not_set(), "img"),
                p_.literal.segmented_list([
                    p_.literal.list([
                        sh.attribute_deprecated("src", $.src),
                        sh.attribute_deprecated("alt", $.alt),
                    ]),
                    p_.from.optional($.width).decide(
                        ($) => p_.literal.list([
                            sh.attribute_deprecated("width", SER_natural($)),
                        ]),
                        () => p_.literal.list([])
                    ),
                    p_.from.optional($.height).decide(
                        ($) => p_.literal.list([
                            sh.attribute_deprecated("height", SER_natural($)),
                        ]),
                        () => p_.literal.list([])
                    )
                ]),
                ['empty', null]
            )])
            default: return p_.exhaustive($[0])
        }
    })

export const Flow_Content: declarations.Flow_Content = ($) => p_.from.list($).map(
    ($) => Flow_Element($)
)

export const Classes: declarations.Classes = ($) => p_.literal.list([
    sh.attribute_deprecated("class", join($.__get_raw())),
])

const join = (values: readonly string[]): string => {
    let result = ""
    for (let index = 0; index < values.length; index += 1) {
        const value = values[index]
        if (value !== undefined) {
            result += (result === "" ? "" : " ") + value
        }
    }
    return result
}

export const Phrasing_Content: declarations.Phrasing_Content = ($) => p_.from.list($).map(
    ($) => ['node', ['element', Phrasing_Element($)]]
)

export const Phrasing_Element: declarations.Phrasing_Element = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'span': return p_.option($, ($) => sh.Element(
                sh.Qualified_Name(p_.literal.not_set(), "span"),
                p_.literal.list([]),
                ['mixed', Phrasing_Content($)]
            ))
            case 'classified span': return p_.option($, ($) => sh.Element(
                sh.Qualified_Name(p_.literal.not_set(), "span"),
                Classes($.classes),
                ['mixed', Phrasing_Content($.content)]
            ))
            case 'titled span': return p_.option($, ($) => sh.Element(
                sh.Qualified_Name(p_.literal.not_set(), "span"),
                p_.literal.list([
                    sh.attribute_deprecated("title", $.title)
                ]),
                ['mixed', Phrasing_Content($.content)]
            ))
            case 'a': return p_.option($, ($) => sh.Element(
                sh.Qualified_Name(p_.literal.not_set(), "a"),
                p_.literal.list([
                    sh.attribute_deprecated("href", $.href)
                ]),
                ['mixed', p_.literal.list([
                    ['text', { 'value': $.text }],
                    ['node', ['element', sh.Element(
                        sh.Qualified_Name(p_.literal.not_set(), "div"),
                        p_.literal.list([]),
                        ['nodes only', { 'children': p_.literal.list([]) }]
                    )]]
                ])]
            ))
            case 'p': return p_.option($, ($) => sh.Element(
                sh.Qualified_Name(p_.literal.not_set(), "p"),
                p_.literal.list([]),
                ['mixed', p_.literal.list([
                    ['text', { 'value': $.text }],
                    ['node', ['element', sh.Element(
                        sh.Qualified_Name(p_.literal.not_set(), "div"),
                        p_.literal.list([]),
                        ['empty', null]
                    )]]
                ])]
            ))
            default: return p_.exhaustive($[0])
        }
    }
)