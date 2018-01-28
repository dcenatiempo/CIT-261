/******************************************************************************* 
 * Topic 5: Browswer Storage
 *   Local Storage
 *   Session Storage
 *   Cookies
 *   Storing and Retrieving Simple Data, Arrays, Associative Arrays, and Objects
*******************************************************************************/

var verticleItemMove = {
    item: null,
    y: null,
    x: null,
    yOffset: null
};
var swipeItemMove = {
    item: null,
    y: null,
    x: null,
    xOffset: null,
    xStart: null
};

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
// add item button
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

var list = document.querySelector(".to-do-list");


list.addEventListener("click", function(e) {
    var item = e.target.parentNode;
    var id = item.id;
    if (item.classList.contains('to-do-item')) {
        for (let i=0; i<toDo.list.length; i++) {
            if (toDo.list[i].id == id) {
                item.classList.toggle('completed');
                toDo.list[i].completed = !toDo.list[i].completed;
                i = toDo.list.length;
            }
        }
    }
    save(toDo);
});

function swipeItem (e) {
    swipeItemMove.item = e.target;
    swipeItemMove.y = e.clientY - e.offsetY;
    swipeItemMove.x = e.clientX;
    swipeItemMove.xOffset = e.offsetX;
    swipeItemMove.yOffset = e.clientY - e.layerY;
    swipeItemMove.xStart = e.target.getBoundingClientRect().left;
    swipeItemMove.item.style.position = 'absolute';
    swipeItemMove.item.style.left = `${swipeItemMove.x - swipeItemMove.xOffset}px`;
    swipeItemMove.item.style.top = `${swipeItemMove.y}px`;
    
    document.addEventListener('mousemove',swipe);
    
    document.addEventListener('mouseup',function(e){
        var currX = e.clientX - e.layerX;
        var start = swipeItemMove.xStart;
        var distance = currX - start;
        var rect = swipeItemMove.item.parentNode.getBoundingClientRect();
        var width = rect.right - rect.left;
        var percent = distance/width
        //console.log(percent)
        // has item moved far enough to the right?
        if (percent > .2) {
            removeItem(swipeItemMove.item.parentNode.id);
            let parent = swipeItemMove.item.parentNode.parentNode;
            console.log(parent)
            let child = swipeItemMove.item.parentNode;
            parent.removeChild(child)
        }
        // NO? Put it back to normal
        document.removeEventListener('mousemove',swipe);
      
      swipeItemMove.item.setAttribute('style', '');
    });

    function swipe(e) {
        var left = e.clientX-e.offsetX;
        if (left < swipeItemMove.xStart) ;
        else {
            swipeItemMove.item.style.left = `${e.clientX - swipeItemMove.xOffset}px`;
        }
    }
};

function dragItem (e) {
    verticleItemMove.item = e.target.parentNode;
    verticleItemMove.y = e.clientY - e.layerY;
    verticleItemMove.x = e.clientX - e.layerX;
    verticleItemMove.yOffset = e.layerY;
    verticleItemMove.item.style.position = 'absolute';
    verticleItemMove.item.style.left = `${verticleItemMove.x}px`;
    verticleItemMove.item.style.top = `${verticleItemMove.y}px`;
    
    document.addEventListener('mousemove',drag);
    
    document.addEventListener('mouseup',function(e){
        var currY = e.clientY - e.layerY;
        verticleItemMove.item.parentNode.removeChild(verticleItemMove.item);
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
        moveItem(verticleItemMove.item.id, position-1);
        list.insertBefore(verticleItemMove.item, list.childNodes[position])
        document.removeEventListener('mousemove',drag);
      
      verticleItemMove.item.setAttribute('style', '');
    });

    function drag(e) {
        verticleItemMove.item.style.top = `${e.clientY - verticleItemMove.yOffset}px`;
    }
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
    span.classList.add('drop-zone-child');
    span.addEventListener( 'mousedown', swipeItem);
    
    handle.appendChild(document.createTextNode('↕'));
    handle.classList.add('handle');
    handle.classList.add('drop-zone-child');
    handle.addEventListener( 'mousedown', dragItem )

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

