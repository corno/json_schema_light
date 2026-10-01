#!/usr/bin/env node

import * as p_h from 'pareto-core-application/index'
import p_unreachable_code_path from 'pareto-core/transformer/specials/unreachable_code_path'

import * as transformer from "./transform.js"

import * as r_deserialize from "./modules/source.liana.generated/schemas/resolved/refiners/list_of_characters.js"
import * as r_resolve from "./modules/target.liana.generated/schemas/resolved/refiners/unresolved.js"
import * as t_serialize from "./modules/target.liana.generated/schemas/resolved/transformers/serialized_paragraph.js"
import * as ser_resolved_document_deserialization from "liana-runtime/modules/resolved_document_deserialization/schemas/resolved_document_deserialization/serializers"
import * as ser_resolving from "liana-runtime/modules/resolved_document_deserialization/schemas/resolving/serializers"


p_h.run_main_transformer(
    ($, abort) => t_serialize.Root(
        r_resolve.Root(
            transformer.Root(
                r_deserialize.Root(
                    $,
                    ($) => abort(ser_resolved_document_deserialization.Error($)),
                    {
                        'tab size': 4
                    }
                ),
            ),
            ($) => p_unreachable_code_path("there is an error in the transformer logic: " + ser_resolving.Error($)),
        ),
        {
            'indentation': "    "
        }
    )
)