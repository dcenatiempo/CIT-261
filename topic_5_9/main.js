/******************************************************************************* 
 * Topic 5: Browswer Storage
 *   Local Storage
 *   Session Storage
 *   Cookies
 *   Storing and Retrieving Simple Data, Arrays, Associative Arrays, and Objects
*******************************************************************************/

var draggedItem = {
    item: null,     // DOM Element
    y: null,        // Mouse y
    x: null,        // Mouse x
    xOffset: null,  // x mouse distance from upper left corner of Element
    yOffset: null,  // y mouse distance from upper left corner of Element
    xStart: null,   // x upper left corner of Element
    yStart: null,   // y upper left corner of Element
    startTime: null // start time of mousedown
};
var clickStart;

// initial set up of toDo list
var toDo;
if (localStorage.length === 0) {
    toDo = {
        lastID: 4,
        list: [
            {
                title: 'Reorder with arrow',
                completed: true,
                id: 3
            },
            {
                title: 'Click to complete',
                completed: false,
                id: 0
            },
            {
                title: 'Swipe right to delete',
                completed: true,
                id: 1
            }
        ]
    }
}
else {
    toDo = localStorage.getItem('toDo');
    toDo = JSON.parse(toDo);
}
drawList(toDo.list);

var item = function(title, id) {
    return (
        {
            title: title,
            completed: false,
            id: id
        }
    );
};

/***************************************************
 * Event Listeners
 **************************************************/
// add list item button
document.querySelector("#add-item")
    .addEventListener("click", function(){
        var input = document.getElementById('item-input').value;
        if (!input.replace(/\s/g, '').length) {
            console.log('too much space');
            document.getElementById('item-input').value = '';
            return;
        }
        var newItemObject = item(input, ++toDo.lastID);
        toDo.list.push(newItemObject);
        drawList([newItemObject])

        document.getElementById('item-input').value = '';
        save(toDo);
    });

// the toDo list DOM Element
var list = document.querySelector(".to-do-list");

// complete item
list.addEventListener("click", function(e) {
    var item = e.target.parentNode;
    var id = item.id;
    console.log(e)
    var timeDif = e.timeStamp - clickStart.timeStamp;
    var mouseDif = e.clientX - clickStart.clientX;
    console.log(timeDif + ' ' + mouseDif)
    if (timeDif < 300 && mouseDif < 5) {
        if (item.classList.contains('to-do-item')) {
            for (let i=0; i<toDo.list.length; i++) {
                if (toDo.list[i].id == id) {
                    item.classList.toggle('completed');
                    toDo.list[i].completed = !toDo.list[i].completed;
                    i = toDo.list.length;
                }
            }
        }
    }
    save(toDo);
});

function swipeItem (e) {
    console.log(e)
    clickStart = {
        top: e.target.getBoundingClientRect().top,
        left: e.target.getBoundingClientRect().left,
        item: e.target,
        clientX: e.clientX,
        clientY: e.clientY
    };
    console.log(clickStart)

    document.addEventListener('mousemove',swipe);
    
    document.addEventListener('mouseup',function(e){
        var currX = e.clientX - e.layerX;
        var start = draggedItem.xStart;
        var distance = currX - start;
        var rect = e.parentNode.getBoundingClientRect();
        var width = rect.right - rect.left;
        var percent = distance/width
        //console.log(percent)
        // has item moved far enough to the right?
        if (percent > .2) {
            removeItem(draggedItem.item.parentNode.id);
            let parent = draggedItem.item.parentNode.parentNode;
            console.log(parent)
            let child = draggedItem.item.parentNode;
            parent.removeChild(child)
        }
       //NO? Put it back to normal
        document.removeEventListener('mousemove',swipe);
      
      draggedItem.item.setAttribute('style', '');
    });
};

function swipe(e) {
    console.log(clickStart)
    var thing = document.getElementById(`${clickStart.item.parentNode.id}`).querySelector('span')

    // is item left edge left of the starting left egde?
    var edgeDif = thing.getBoundingClientRect().left - clickStart.left;
    var mouseDif = e.clientX - clickStart.clientX;
    console.log(mouseDif)
    if (mouseDif <= 0) {
        console.log('if')
        // yes: reassign clickStart
        if (clickStart.clientX > e.clientX) {
            clickStart.clientX = e.clientX;
        }
    }
    else {
        console.log('else mousedif '+ mouseDif)
        // no: move item with mouse
        //if (e.target.classList.contains('item-child') && e.target === clickStart.target)
        thing.style.transform = `translateX(${mouseDif}px)`;
    }
}



function dragItem (e) {
    createStartClick(e);
    draggedItem.item = e.target.parentNode;
    draggedItem.y = e.clientY - e.layerY;
    draggedItem.x = e.clientX - e.layerX;
    draggedItem.yOffset = e.layerY;
    draggedItem.item.style.position = 'absolute';
    draggedItem.item.style.left = `${draggedItem.x}px`;
    draggedItem.item.style.top = `${draggedItem.y}px`;
    
    document.addEventListener('mousemove',drag);
    
    document.addEventListener('mouseup',function(e){
        var currY = e.clientY - e.layerY;
        draggedItem.item.parentNode.removeChild(draggedItem.item);
        var list = document.querySelector('.to-do-list');
        var position = 1;
        for (let i=1; i<list.childNodes.length; i++) {
            //console.log(list.childNodes)
            let rect = list.childNodes[i].getBoundingClientRect();
            //console.log(currY, rect.top)
            if (currY > rect.top) {
                position++
            }
        }
        moveItem(draggedItem.item.id, position-1);
        list.insertBefore(draggedItem.item, list.childNodes[position])
        document.removeEventListener('mousemove',drag);
      
      draggedItem.item.setAttribute('style', '');
    });
}


function drag(e) {
    draggedItem.item.style.top = `${e.clientY - draggedItem.yOffset}px`;
}


/***************************************************
 * DOM
 **************************************************/

function buildItem(item) {
    var li = document.createElement('div');
    var title = document.createTextNode(item.title);
    var handle = document.createElement('div');
    var span = document.createElement('span');
    
    span.appendChild(title);
    span.classList.add('item-child');
    span.addEventListener( 'mousedown', swipeItem);
    //span.addEventListener( 'touchstart', swipeItemT);
    
    handle.appendChild(document.createTextNode('↕'));
    handle.classList.add('handle');
    handle.addEventListener( 'mousedown', dragItem )
    //handle.addEventListener( 'touchstart', dragItemT )

    li.id = item.id;
    li.classList.add('to-do-item');
    li.appendChild(handle);
    li.appendChild(span);
    if (item.completed === true) {
        li.classList.add('completed')
    }

    return li;
}

function addItemToDOM(li) {
    var div = document.querySelector('div.to-do-list');
    div.appendChild(li);
}

function drawList(list) {
    list.forEach( item => {
        var listItem = buildItem(item);
        addItemToDOM(listItem);
    });
};
// remove from object
function removeItem(id) {
    for (let i=0; i<toDo.list.length; i++) {
        if (toDo.list[i].id == id) {
            toDo.list.splice(i, 1);
        }
    }
    save(toDo);
}

function moveItem(id, position) {
    for (let i=0; i<toDo.list.length; i++) {
        if (toDo.list[i].id == id) {
            let item = toDo.list[i];
            toDo.list.splice(i, 1);
            toDo.list.splice(position < i ? position : position+1, 0, item);
        }
    }
    save(toDo);
}

function save(toDo) {
    localStorage.setItem('toDo', JSON.stringify(toDo));
}



//     return ({
//         item : e.target,
//         y : e.clientY - e.offsetY,
//         x : e.clientX,
//         xOffset : e.offsetX,
//         yOffset : e.clientY - e.layerY,
//         xStart : e.target.getBoundingClientRect().left,
//     });
// }

