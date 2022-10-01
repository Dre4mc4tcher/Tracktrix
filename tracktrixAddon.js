function modify_parent_function() {
    const change_parent_function = function() {
        this.render_tracker = function() {
            //...
                var a = "";
                a += "<div style='font-size: 32px'>";
                a += "<div style='background-color:#575983; border: 2px solid #9F9FB0; display: inline-block; margin: 2px; padding: 6px;' class='clickable' onclick='pcs(event); $(\".trackers\").hide(); $(\".trackerm\").show();'>Monsters</div>";
                a += "<div style='background-color:#575983; border: 2px solid #9F9FB0; display: inline-block; margin: 2px; padding: 6px;' class='clickable' onclick='pcs(event); $(\".trackers\").hide(); $(\".trackere\").show();'>Exchanges and Quests</div>";
                a += "<div style='background-color:#575983; border: 2px solid #9F9FB0; display: inline-block; margin: 2px; padding: 6px;' class='clickable' onclick='pcs(event); $(\".trackers\").hide(); $(\".trackerx\").show();'>Stats</div>";
                a += "</div>";
                a += "<div class='trackers trackerm'>";
                object_sort(G.monsters, "hpsort").forEach(function(b) {
                    if ((!b[1].stationary && !b[1].cute || b[1].achievements) && !b[1].unlist) {
                        var c = (tracker.monsters[b[0]] || 0) + (tracker.monsters_diff[b[0]] || 0), d = "#50ADDD";
						
                        let borderColor = "#9F9FB0";
				
                        tracker.max.monsters[b[0]] && tracker.max.monsters[b[0]][0] > c && (c = tracker.max.monsters[b[0]][0], d = "#DCC343");
						if((tracker.max.monsters[b[0]] && tracker.max.monsters[b[0]][0] && tracker.max.monsters[b[0]][0])&&(b[1] && b[1].achievements)){if(tracker.max.monsters[b[0]][0]>=b[1].achievements[b[1].achievements.length-1][0]){
						borderColor="#22c725";
						}  }							
						
                        a += "<div style='background-color:#575983; border: 2px solid"+ borderColor +";position: relative; display: inline-block; margin: 2px; /*" + b[0] + "*/' class='clickable' onclick='pcs(event); render_monster_info(\"" + b[0] + "\")'>";
                        
                        a = 1 > (G.monsters[b[0]].size || 1) ? a + sprite(b[1].skin || b[0], {
                            scale: 1
                        }) : a + sprite(b[1].skin || b[0], {
                            scale: 1.5
                        });
                        c && (a += "<div style='background-color:#575983; border: 2px solid "+ borderColor+"; position: absolute; top: -2px; left: -2px; color:" + d + "; display: inline-block; padding: 1px 1px 1px 3px;'>" + to_shrinked_num(c) + "</div>");
                        tracker.drops && tracker.drops[b[0]] && tracker.drops[b[0]].length && (a += "<div style='background-color:#FD79B0; border: 2px solid "+ borderColor +"; position: absolute; bottom: -2px; right: -2px; display: inline-block; padding: 1px 1px 1px 1px; height: 2px; width: 2px'></div>");
                        a += "</div>"
                    }
                });
                a += "</div>";
                a += "<div class='trackers trackere hidden' style='margin-top: 3px'>";
                object_sort(G.items).forEach(function(b) {
					
                    if (b[1].e && !b[1].ignore) {
                        var c = [[b[0], b[0], void 0]];
                        if (b[1].upgrade || b[1].compound) {
                            c = [];
                            for (var d = 0; 13 > d; d++)
                                G.drops[b[0] + d] && c.push([b[0], b[0] + d, d])
                        }
						
                        c.forEach(function(b) {
                            a += "<div style='margin-right: 3px; margin-bottom: 3px; display: inline-block; position: relative;'";
                            a = G.drops[b[1]] ? a + (" class='clickable' onclick='pcs(event); render_exchange_info(\"" + b[1] + '",' + (tracker.exchanges[b[1]] || 0) + ")'>") : a + ">";
                            a += item_container({
                                skin: G.items[b[0]].skin
                            }, {
                                name: b[0],
                                level: b[2]
                            });
                            tracker.exchanges[b[1]] && (a += "<div style='background-color:#575983; border: 2px solid #9F9FB0; position: absolute; top: -2px; left: -2px; color:#ED901C; font-size: 16px; display: inline-block; padding: 1px 1px 1px 3px;'>" + to_shrinked_num(tracker.exchanges[b[1]]) + "</div>");
                            a += "</div>"
                        })
                    }
                });
                a += "</div>";
                
				const kills = parent.tracker.max.monsters;

    			const achievements = {};

    			for (const mtype in kills) {
        			if (!(mtype in G.monsters) || !G.monsters[mtype].achievements) continue;

        		    const kill_count = kills[mtype][0];

                    for (const achievement of G.monsters[mtype].achievements) {
                        const needed = achievement[0];
                        const type = achievement[1];
                        const reward = achievement[2];
                        const amount = achievement[3];
                        if (kill_count < needed){
                        if (type !== "stat") continue;
            
                        if (!achievements[reward]) achievements[reward] = {value:0,maxvalue:0}            
                        achievements[reward].value += 0;
                        achievements[reward].maxvalue += amount;
                        }			
                        else{
                        if (type !== "stat") continue;
                        if (!achievements[reward]) achievements[reward] = {value:0,maxvalue:0}
                        achievements[reward].value += amount;
                        achievements[reward].maxvalue += amount;
                        }	
                        
                    }
                }
                let k = achievements;
                a += "<div class='trackers trackerx hidden' style='margin-top: 3px'>";
                a += "<div style='font-size: 32px'>";
                for(const ac in k){
                    if(Number.isInteger(k[ac].value) && Number.isInteger(k[ac].maxvalue) ){ 
                        a+="<div style='background-color:#575983; border: 2px solid #9F9FB0;position: relative; display: inline-block; margin: 2px; padding: 2px;'> "+`${ac}: ${k[ac].value} of ${k[ac].maxvalue}`+"</div>";
                    }
                    else{
                        a+="<div style='background-color:#575983; border: 2px solid #9F9FB0;position: relative; display: inline-block; margin: 2px; padding: 2px;'> "+`${ac}: ${k[ac].value.toFixed(2)} of ${k[ac].maxvalue.toFixed(2)}`+"</div>";
                    }
                   
                }
                a += "</div>"
                a += "</div>";
                a += "</div>";
                
                show_modal(a, {
                    wwidth: 578,
                    hideinbackground: !0
                })
            
            //...
        }
        ///
        this.render_drop = function(a,b,c) {
            //...
            var d = "";
    if ("open" == a[1]) {
        var e = 0;
        G.drops[a[2]].forEach(function(a) {
            e += a[0]
        });
        G.drops[a[2]].forEach(function(g) {
            d += render_drop(g, b * a[0] / e, c)
        });
        return d
    }
    d += "<div style='position: relative; white-space: nowrap;'>";
    var f = ""
      , g = void 0;
    G.items[a[1]] ? (f = G.items[a[1]].skin,
    g = {
        name: a[1],
        q: a[2],
        data: a[3]
    }) : "empty" == a[1] ? d += "<div style='z-index: 1; background-color:#575983; border: 200px solid #9F9FB0; position: absolute; top: -2px; left: -2px; color:#C5C7E0; font-size: 16px; display: inline-block; padding: 1px 1px 1px 3px;'>ZILCH</div>" : "shells" == a[1] ? (d += "<div style='z-index: 1; background-color:#575983; border: 2px solid #9F9FB0; position: absolute; top: -2px; left: -2px; color:#8DE33B; font-size: 16px; display: inline-block; padding: 1px 1px 1px 3px;'>" + to_shrinked_num(a[2]) + "</div>",
    f = "shells") : "gold" == a[1] && (d += "<div style='z-index: 1; background-color:#575983; border: 2px solid #9F9FB0; position: absolute; top: -2px; left: -2px; color:gold; font-size: 16px; display: inline-block; padding: 1px 1px 1px 3px;'>" + to_shrinked_num(a[2]) + "</div>",
    f = "gold");
    "cx" == a[1] ? d += cx_sprite(a[2], {
        mright: 4
    }) : "cxbundle" == a[1] ? G.cosmetics.bundle[a[2]].forEach(function(a) {
        d += cx_sprite(a, {
            mright: 4
        })
    }) : d += "<span class='clickable' onclick='pcs(event); render_item_info(\"" + a[1] + '",0,"' + (g && g.data || "") + "\")'>" + item_container({
        skin: f
    }, g) + "</span>";
    d = 1 <= round(a[0] * b) ? d + ("<div style='vertical-align: middle; display: inline-block; font-size: 24px; line-height: 50px; height: 50px; margin-left: 5px; margin-right: 8px'>" + to_pretty_num(round(a[0] * b)) + " / 1</div>") : 1.1 <= 1 / (a[0] * b) && 10 > 1 / (a[0] * b) && 10 * parseInt(1 / (a[0] * b)) != parseInt(10 / (a[0] * b)) ? d + ("<div style='vertical-align: middle; display: inline-block; font-size: 24px; line-height: 50px; height: 50px; margin-left: 5px; margin-right: 8px'>10 / " + to_pretty_num(round(10 / (a[0] * b))) + "</div>")+("<div style='vertical-align: middle; display: inline-block; font-size: 24px; line-height: 50px; height: 50px; margin-left: 5px; margin-right: 8px;color:#22c725;'>[10 / "+ to_pretty_num(round(10 / ((a[0] * b)*parent.character.luckm)))+"]" + "</div>") : d + ("<div style='vertical-align: middle; display: inline-block; font-size: 24px; line-height: 50px; height: 50px; margin-left: 5px; margin-right: 8px'>1 / " + to_pretty_num(round(1 / ((a[0] * b)))) +"</div>")+("<div style='vertical-align: middle; display: inline-block; font-size: 24px; line-height: 50px; height: 50px; margin-left: 5px; margin-right: 8px;color:#22c725;'>[1 / " + to_pretty_num(round(1 / ((a[0] * b)*parent.character.luckm))) +"]"+ "</div>");
    return d += "</div>"   
            
            //...
        }
    }
    // Eval the function string to have to defined in parent scope
    const full_function_text = change_parent_function.toString();
    parent.smart_eval(full_function_text.slice(full_function_text.indexOf("{") + 1, full_function_text.lastIndexOf("}")));
}
modify_parent_function();
