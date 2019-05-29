
    function sort() {
        var nodeList = document.querySelectorAll('.cards__container');
        var itemsArray = [];
        var parent = nodeList[0].parentNode;
        for (var i = 0; i < nodeList.length; i++) {
            itemsArray.push(parent.removeChild(nodeList[i]));
        }
        itemsArray.sort(function(nodeA, nodeB) {
                var textA = nodeA.querySelector('.cards__container-item-price').getAttribute("data-price");
                var textB = nodeB.querySelector('.cards__container-item-price').getAttribute("data-price");
                var numberA = parseInt(textA);
                var numberB = parseInt(textB);
                if (numberA < numberB) return -1;
                if (numberA > numberB) return 1;
                return 0;
            })
            .forEach(function(node) {
                parent.appendChild(node)
            });
    }