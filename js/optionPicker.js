

(function(){
    // 单选
    function select(){
        var $optionSelects = $('.-optionSelect-');
        $optionSelects.each(function(){
            var $optionSelect = $(this);
            init($optionSelect);
        });

        function init($optionSelect){

            $optionSelect.addClass('select');
            var text = '';
            var defaultValue = '';
            var defaultName = '';
            console.log($optionSelect.children('ul').children('li').not('.lastBtn'));
            if($optionSelect.children('ul').children('li').not('.lastBtn').length == 0){
            } else if($optionSelect.children('ul').children('li.liSelected').length == 0){
                text = $optionSelect.children('ul').children('li:first-child').text();
                defaultValue = (($optionSelect.children('ul').children('li:first-child').attr('value') != null)?$optionSelect.children('ul').children('li:first-child').attr('value'):$optionSelect.children('ul').children('li:first-child').attr('valueA'))
                //defaultValue = $optionSelect.children('ul').children('li:first-child').attr('value');
                defaultName = $optionSelect.children('ul').children('li:first-child').attr('name');
            } else {
                text = $optionSelect.children('ul').children('li.liSelected').text();
                defaultValue = (($optionSelect.children('ul').children('li.liSelected').attr('value') != null)?$optionSelect.children('ul').children('li.liSelected').attr('value'):$optionSelect.children('ul').children('li.liSelected').attr('valueA'));
                //defaultValue = $optionSelect.children('ul').children('li.liSelected').attr('value');
                defaultName = $optionSelect.children('ul').children('li.liSelected').attr('name');
            }
            $optionSelect.val(defaultValue);
            $optionSelect.attr('name',defaultName);


            var $optionTitle = $('' +
                '<div class="-optionTitle-">' +
                '<span class="-optionSelected-">'+ text +'</span>' +
                '<span class="-optionIcon-"><img src="../img/ico_down.png"></span>' +
                '</div>'
            );
            $optionSelect.prepend($optionTitle);

            var $ulDiv = $('<div class="ulDiv"></div>');
            $optionTitle.after($ulDiv);
            $ulDiv.append($optionSelect.find('ul'));

            //$optionTitle.on('mouseover',function(){
            //    $(this).parents('.-optionSelect-').find('ul').css('visibility','visible');
            //});
            //$optionSelect.on('mouseleave',function(){
            //    $(this).find('ul').css('visibility','hidden');
            //});


            $optionTitle.on('click',function(){
                if($(this).parents('.-optionSelect-').find('ul').css('visibility')== 'visible'){
                    $(this).parents('.-optionSelect-').find('ul').css('visibility','hidden');
                    $(this).find('img').attr('src','../img/ico_down.png');
                }else{
                    $(this).parents('.-optionSelect-').find('ul').css('visibility','visible');

                    $(this).find('img').attr('src','../img/ico_up.png');
                }

            });
            $(document).on('click', function(e) {
                if ($.contains($optionSelect[0], e.target)) {
                    return;
                }
                $optionSelect.find('ul').css('visibility','hidden');
                $optionSelect.find('img').attr('src','../img/ico_down.png');
            });


            $optionSelect.find('ul').children('*').each(function(){
                if($(this).is('li')){
                    initLi($(this),$optionSelect);
                } else if ($(this).is('.li-div')) {
                    initLiDiv($(this),$optionSelect);
                }
            });
        }


        function initLiDiv($this,$optionSelect){

            var $liDiv = $this;
            $this.children('*').each(function(){
                if($(this).is('li')){
                    initLi($(this),$optionSelect);
                } else if ($(this).is('.li-div')) {
                    initLiDiv($(this),$optionSelect);
                } else if ($(this).is('span')) {
                    $liDiv.attr('li-div-title',$(this).text());
                    initLiDivTitle($(this),$optionSelect,$liDiv);
                }
            });
        }

        function initLiDivTitle($this,$optionSelect,$liDiv){
            var text = $this.text();
            var $checkBox = $('<span class="li-standard-icon"></span>');
            var $span = $('<span class="li-standard-text"><span>'+ text +'</span></span>');
            $this.remove();

            var $liTitle = $('<li ></li>');
            $liTitle.attr('li-div-title',text);
            $liTitle.append($checkBox);
            $liTitle.append($span);
            $liTitle.addClass('li-standards-title');

            $liDiv.before($liTitle);

            $liTitle.on('click',function(e){

                var $this = $(this);

                var title = $this.attr('li-div-title');

                if ($this.hasClass('li-standards-title-show')) {
                    $this.next('.li-div[li-div-title='+ title +']').slideUp(150);
                    $this.removeClass('li-standards-title-show');
                } else {
                    $this.next('.li-div[li-div-title='+ title +']').slideDown(150);
                    $this.addClass('li-standards-title-show');
                }

                e.stopPropagation();
            });
        }

        function initLi($this,$optionSelect,liData){

            if($this.hasClass('lastBtn')){
                return;
            }

            if($optionSelect.attr('name') == '' && $optionSelect.find('ul').children('li').not('.lastBtn').length != 0){
                var value = (($optionSelect.find('ul').children('li:first-child').attr('value') != null)?$optionSelect.find('ul').children('li:first-child').attr('value'):$optionSelect.find('ul').children('li:first-child').attr('valueA'));
                $optionSelect.val(value);
                $optionSelect.attr('name',$optionSelect.find('ul').children('li:first-child').attr('name'));
                $optionSelect.find('.-optionTitle-').find('.-optionSelected-').text($optionSelect.find('ul').children('li:first-child').text());

            }


            var text = $this.text();
            $this.empty();

            var canDelete = (liData)?liData.canDelete:null;
            if($this.attr('canDelete') == 'canDelete'){
                canDelete = true;
            }
            var $deleteIcon = $('<span class="li-standard-icon deleteIcon"></span>');
            var $span = $('<span title="'+ text +'">'+ text +'</span>');
            if(canDelete){
                $this.append($deleteIcon);
                $span.css('padding-right', '20px');
            }
            $this.addClass('li-standard');
            $deleteIcon.on('click',function(e){
                if(liData && liData.deleteFunction && typeof(liData.deleteFunction) == 'function'){
                    liData.deleteFunction({value:(($(this).parent().attr('value') != null)?$(this).parent().attr('value'):$(this).parent().attr('valueA')),text:text,name:$(this).parent().attr('name')});
                }
                e.stopPropagation();
            });

            $this.append($span);


            $this.on('click',function(){
                $optionSelect.find('img').attr('src','../img/ico_down.png');
                var text = $(this).text();
                var value = (($(this).attr('value') != null)?$(this).attr('value'):$(this).attr('valueA'));
                var name = $(this).attr('name');

                var oldText = $(this).parents('.-optionSelect-').find('.-optionSelected-').text();
                var oldValue = $(this).parents('.-optionSelect-').val();
                var oldName = $(this).parents('.-optionSelect-').attr('name');

                $(this).parents('.-optionSelect-').find('.-optionTitle-').children('.-optionSelected-').text(text);
                $(this).parents('.-optionSelect-').val(value);
                $(this).parents('.-optionSelect-').attr('name',name);

                $(this).parents('.-optionSelect-').find('ul').css('visibility','hidden');

                if(text != oldText || value != oldValue || name != oldName){
                    $(this).parents('.-optionSelect-').trigger('change');
                }
            });
        }

        return {
            initLi:initLi,
            initLiDiv:initLiDiv
        };
    }
    var selectInit = select();

    $.fn.optionPicker = function(type,liArray){
        var $optionPicker = $(this);

        var functionMap = {
            addLi:function(){
                if(typeof(liArray) == 'object' && liArray.constructor == Array){

                    if($optionPicker.hasClass('-optionSelect-')){
                        for(var i in liArray){
                            var item = liArray[i];
                            if(item.title != null){
                                var $liDiv = addLiDiv(item,$optionPicker.find('ul'));
                                selectInit.initLiDiv($liDiv,$optionPicker,item);
                            } else {
                                var $li = addLi(item,$optionPicker.find('ul'));
                                selectInit.initLi($li,$optionPicker,item);
                            }
                        }

                        function addLiDiv(item,$parent){
                            var $liDiv = $('<div class="li-div">');
                            $parent.append($liDiv);
                            $parent.append($parent.find('.lastBtn'));
                            var $title = $('<span>'+ item.title +'</span>');
                            $liDiv.append($title);
                            $parent.append($parent.find('.lastBtn'));

                            for(var j in item.liArray){
                                var item1 = item.liArray[j];
                                if(item1.title != null){
                                    addLiDiv(item1,$liDiv);
                                } else {
                                    addLi(item1,$liDiv);
                                }
                            }

                            return $liDiv;
                        }

                        function addLi(item,$parent){
                            var $li = $('<li valueA="' + item.value + '" name="' + item.name + '">'+ item.text +'</li>');
                            $parent.append($li);
                            $parent.append($parent.find('.lastBtn'));
                            return $li;
                        }

                    } else if($optionPicker.hasClass('-optionPicker-')){
                        for(var i in liArray){
                            var item = liArray[i];
                            var $li = $('' +
                                '<li valueA="' + item.value + '" name="' + item.name + '">' +
                                '<span><input type="checkbox"/></span>' +
                                '<span>'+ item.text +'</span>' +
                                '</li>');
                            $optionPicker.find('ul').append($li);
                            $optionPicker.find('ul').append($optionPicker.find('ul').find('.lastBtn'));

                            pickerInitLi($li,$optionPicker,item);
                        }
                    }

                }
            },
            removeLi:function(){
                if(typeof(liArray) == 'object' && liArray.constructor == Array){

                    if($optionPicker.hasClass('-optionSelect-')){

                        for(var i in liArray){
                            var item = liArray[i];
                            $optionPicker.find('ul').find('li').each(function(){
                                if((($(this).attr('value') != null)?$(this).attr('value'):$(this).attr('valueA')) == item.value){
                                    if(item.text || item.text == 0){
                                        if($(this).text() == item.text){
                                            if($optionPicker.val() == item.value){
                                                $(this).remove();
                                                if($optionPicker.find('ul').children('li').length != 0){
                                                    $optionPicker.find('ul').children('li:first-child').trigger('click');
                                                }
                                            } else {
                                                $(this).remove();
                                            }
                                        }
                                    } else {
                                        if($optionPicker.val() == item.value){
                                            $(this).remove();
                                            if($optionPicker.find('ul').children('li').length != 0){
                                                $optionPicker.find('ul').children('li:first-child').trigger('click');
                                            }
                                        } else {
                                            $(this).remove();
                                        }
                                    }
                                }
                            });
                        }

                    } else if($optionPicker.hasClass('-optionPicker-')){
                        for(var i in liArray){
                            var item = liArray[i];
                            $optionPicker.find('ul').find('li').each(function(){
                                if((($(this).attr('value') != null)?$(this).attr('value'):$(this).attr('valueA')) == item.value){
                                    if(item.text || item.text == 0){
                                        if($(this).find('.li-standard-text').text() == item.text){
                                            if($(this).hasClass('li-standard-selected')){
                                                $(this).trigger('click');
                                            }
                                            $(this).remove();
                                        }
                                    } else {
                                        if($(this).hasClass('li-standard-selected')){
                                            $(this).trigger('click');
                                        }
                                        $(this).remove();
                                    }
                                }
                            });
                        }
                    }
                }
            },
            empty:function(){
                if($optionPicker.hasClass('-optionSelect-')){

                    $optionPicker.val('',true);
                    $optionPicker.attr('name','');
                    $optionPicker.find('.-optionTitle-').find('.-optionSelected-').text('');

                    $optionPicker.find('ul').find('li').each(function(){
                        if(!$(this).hasClass('lastBtn')){
                            $(this).remove();
                        }
                    });

                } else if($optionPicker.hasClass('-optionPicker-')){

                    $optionPicker.data('value',[]);
                    $optionPicker.data('dataArray',[]);
                    $optionPicker.val('',true);

                    $optionPicker.find('ul').find('li').each(function(){
                        if(!$(this).hasClass('lastBtn')){
                            $(this).remove();
                        }
                    });
                }
            }
        };

        functionMap[type]();
    };


    var valFunction = $.fn.val;
    $.fn.extend({
        val:function(option){
            if($(this).hasClass("-optionPicker-")){
                if(arguments[0] == null){
                    return valFunction.apply($(this),arguments);
                } else {
                    if(!arguments[1]){
                        var valueArray = arguments[0].split(';');
                        if(arguments[0] == ''){
                            valueArray = [];
                        }
                        $(this).data('value',valueArray);

                        var dataArray = [];

                        $(this).find('ul').find('li').each(function(){
                            $(this).removeClass('li-standard-selected');
                            for(var i in valueArray){
                                var value = valueArray[i];
                                if((($(this).attr('value') != null)?$(this).attr('value'):$(this).attr('valueA')) == value){
                                    $(this).addClass('li-standard-selected');
                                    dataArray.push({
                                        value:value,
                                        text:$(this).find('.li-standard-text').text()
                                    });

                                    break;
                                }
                            }
                        });
                        $(this).data('dataArray',dataArray);
                    }

                    return valFunction.apply($(this),arguments);
                }
            } else if($(this).hasClass("-optionSelect-")){
                if(arguments[0] == null){
                    return valFunction.apply($(this),arguments);
                } else {
                    var value = arguments[0];

                    $(this).find('ul').children('li').each(function(){
                        if((($(this).attr('value') != null)?$(this).attr('value'):$(this).attr('valueA')) == value){

                            var text = $(this).text();
                            $(this).parents('.-optionSelect-').find('.-optionTitle-').children('.-optionSelected-').text(text);

                            return false;
                        }
                    });

                    return valFunction.apply($(this),arguments);
                }
            } else {
                return valFunction.apply($(this),arguments);
            }
        }
    });
})();
