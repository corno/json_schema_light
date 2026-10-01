import * as p_ from 'pareto-core/transformer'
import * as s_target from "./modules/target.liana.generated/schemas/unresolved/schema.js"

export function Document(
    doc_type: s_target.Document.doc_type,
    root: s_target.Document.root,
): s_target.Document {
    return ({
        'doc type': doc_type,
        'root': root,
    })
}

export function Element(
    name: s_target.Element.name,
    attributes: s_target.Element.attributes,
    content_type: s_target.Element.content_type,
): s_target.Element {
    return ({
        'name': name,
        'attributes': attributes,
        'content type': content_type,
    })
}

export namespace Element {

    export namespace Attributes {

        export const L = (
            name: s_target.Element.attributes.L.name,
            value: s_target.Element.attributes.L.value,
        ): s_target.Element.attributes.L => ({
            'name': name,
            'value': value
        })

    }
}

export const Qualified_Name = (
    namespace_prefix: s_target.Qualified_Name.namespace_prefix,
    local_name: s_target.Qualified_Name.local_name,
): s_target.Qualified_Name => ({
    'namespace prefix': namespace_prefix,
    'local name': local_name,
})

export const attribute_deprecated = (
    name: string,
    value: string,
): s_target.Element.attributes.L => Element.Attributes.L(
    Qualified_Name(p_.literal.not_set(), name),
    value,
)
