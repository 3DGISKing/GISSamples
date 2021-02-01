jQuery.ajax({
    type: "GET",
    url: './data.json',
    success: function(data) {
        main(data);
    },
    error: (e) => {
        console.error(e)
    }
});

//test();

let tree;

function main(wmsData) {
    const layer = wmsData.Capability.Layer;

    console.log(layer);

    console.log(jQuery.jstree.version);

    tree = jQuery("#jstree");

    tree.jstree({
        'plugins': ["checkbox", "wholerow"],
        'core': {
            "dblclick_toggle": true,
            "state": {
                "checked": false
            },
            'check_callback': true,
            "expand_selected_onload": true,

            // remove icon, dot line
            /*
            "themes": {
                "icons": false,
                "dots": false
            }
            */
            //"multiple": true
        },
        "checkbox": {
            "keep_selected_style": true,
            "three_state": false,
            "whole_node": false,
            "tie_selection": false,
        }
    });

    generateTree(layer, '#');
}

function generateTree(layer, parentNode) {
    if(layer.Layer === undefined) {
        // leaf node
        tree.jstree('create_node',
            parentNode,
            {
                "text": layer.Name,
                "icon": './tree.png',
                "state": {
                  //  selected : false,
                  //  disabled: true
                },
                data: {
                    "layerInfo": layer,
                }
            },
            "last",
            false,
            false,
        );

        return;
    }

    // non leaf node
    const title = layer.Title;

    let opened = false;

    // check if first level
    if(parentNode === '#')
        opened = true;

    let node1 = tree.jstree('create_node',
        parentNode,
        {
            "text": title,
            "state": {
                opened : opened,
            },
            a_attr: {
                class: "no_checkbox"
            }
        },
        "last",
        false,
        false,
    );

    for(let i = 0; i < layer.Layer.length; i++) {
        generateTree(layer.Layer[i], node1);
    }
}

// https://www.jstree.com/api/#/?f=create_node(%5Bpar,%20node,%20pos,%20callback,%20is_loaded%5D

function test() {
    let tree = jQuery("#jstree");

    tree.jstree({
        'plugins': ["checkbox",  "wholerow"],
        'core': {
            "dblclick_toggle": false,
            "state": {
                "checked": false
            },
            'check_callback': true,
            "expand_selected_onload": true,

            // remove icon, dot line
            /*
            "themes": {
                "icons": false,
                "dots": false
            }
            */
           // "multiple": true
        },
        "checkbox": {
            "keep_selected_style": true,
            "three_state": false,
            "whole_node": false,
            "tie_selection": false,
        },

    });

// https://www.jstree.com/api/#/?f=create_node(%5Bpar,%20node,%20pos,%20callback,%20is_loaded%5D

    let node1 = tree.jstree('create_node',
        // parent node (to create a root node use either "#" (string) or null)
        "#",
        // data for the new node
        {
            "text": "<b>1   &nbsp; &nbsp; &nbsp;   Name1</b>",
            "id": "pointclouds",
            "icon": null
        },
        // the index at which to insert the node, "first" and "last" are also supported, default is "last"
        "last",
        // callback
        false,
        false,
    );

    let node1_1 = tree.jstree('create_node',
        node1,
        {
            "text": "<b>1 Name2</b>",
        },
        "last",
        false,
        false,
    );

    let node1_2 = tree.jstree('create_node',
        node1,
        {
            "text": "<b>1_2 Name2</b>",
        },
        "last",
        false,
        false,
    );

    let node2 = tree.jstree('create_node',
        // parent node (to create a root node use either "#" (string) or null)
        "#",
        // data for the new node
        {
            "text": "<b>2</b>",
        },
        // the index at which to insert the node, "first" and "last" are also supported, default is "last"
        "last",
        false,
        false
    );
}

document.getElementById('test').addEventListener('click', ()=>{
    // for remove all
    //$('#jstree').empty();

    const jsonNodes = $('#jstree').jstree(true).get_json('#', { flat: true });

    jsonNodes.forEach(node =>{
        if(!node.data.layerInfo)
            return;

        if(!node.state.checked)
            return;

        console.log(node.data.layerInfo);
    })
});

