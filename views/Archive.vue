<template>
  <div class="notes-home">
    <h2 class="title">笔记·最近编辑</h2>
    <div class="layout-flex">
      <div class="content">
        <ul class="archive-ul">
          <li class="archive-li" v-for="(item, index) in list" :key="index">
            <a class="archive-doc" :href="item.href">
              <div class="doc-info">
                <span class="doc-title">{{ item.title }}</span>
                <span class="dashed-line"></span>
                <span class="doc-date">{{ item.updatedByGit }}</span>
              </div>
            </a>
            <div class="doc-tags">
              <span class="doc-tag" v-for="tag in item.tags" :key="tag">{{ tag }}</span>
            </div>
            <div class="doc-desc">{{ item.description }}</div>
          </li>
        </ul>
      </div>
      <div class="aside">
        <div class="aside-title">tags</div>
        <div class="tags">
          <span
            class="tag"
            :class="{active: selectedTags.includes(k)}" v-for="(v, k) in tagsAndCategories.tags"
            :key="k"
            @click="() => handleTagOrCategoryClick('tag', k)"
          >{{ k }}({{ v }})</span>
        </div>
        <div class="aside-title">categories</div>
        <div class="categories">
          <span
            class="category"
            :class="{active: selectedCategories.includes(k)}" v-for="(v, k) in tagsAndCategories.categories"
            :key="k"
            @click="() => handleTagOrCategoryClick('category', k)"
          >{{ k }}({{ v }})</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDateStr } from "../utils/getDateStr.mjs";
import { matchFilePath } from "../utils/matchFilePath.mjs";

const SORT = {
  TITLE: 'TITLE',
  CREATED: 'CREATED',
  UPDATED: 'UPDATED',
  LAST_UPDATED: 'LAST_UPDATED',
}

export default {
  setup () {
    return {}
  },
  data: () => ({
    sortBy: SORT.LAST_UPDATED,
    selectedTags: [],
    selectedCategories: []
  }),
  props: {
    source: Array
  },
  computed: {
    data() {
      return this.source.map(({file, data, lastUpdated}) => {
        const { title: titleByMatch, isIndex, url } = matchFilePath(file);
        const { title, tags, categories, description, created, updated } = data;
        return {
          file,
          title: title || (isIndex ? titleByMatch + '/index' : titleByMatch),
          tags,
          categories,
          description,
          created: created && getDateStr(created),
          updated: updated && getDateStr(updated),
          updatedByGit: lastUpdated && getDateStr(lastUpdated),
          lastUpdated,
          href: url
        }
      })
    },
    list() {
      return this.data.filter(item => {
        const filter = []
        if (this.selectedTags.length) {
          filter[0] = item.tags.some(v => this.selectedTags.includes(v));
        } else {
          filter[0] = true;
        }
        if (this.selectedCategories.length) {
          filter[1] = item.categories.some(v => this.selectedCategories.includes(v));
        } else {
          filter[1] = true;
        }
        console.log(item, filter);
        return filter[0] === true && filter[1] === true;
      }).sort((a, b) => {
        switch (this.sortBy) {
          case SORT.TITLE: break;
          case SORT.CREATED: return a.created - b.created;
          case SORT.UPDATED: return a.updated - b.updated;
          case SORT.LAST_UPDATED: return a.lastUpdated - b.lastUpdated;
        }
      })
    },
    tagsAndCategories() {
      const data = {
        tags: {},
        categories: {}
      }
      this.data.forEach((item) => {
        ['tags', 'categories'].forEach(key => {
          (item[key] || []).forEach(v => {
            if (data[key][v]) {
              data[key][v]++;
            } else {
              data[key][v] = 1;
            }
          })
        })
      });
      return data;
    }
  },
  methods: {
    handleTagOrCategoryClick(type, value) {
      const data = type === 'tag' ? this.selectedTags : this.selectedCategories;
      const i = data.indexOf(value);
      if (i >= 0) {
        data.splice(i, 1)
      } else {
        data.push(value)
      }
    }
  }
}
</script>

<style>
.notes-home {
  max-width: calc(var(--vp-layout-max-width) - 64px);
  margin: 0 auto;
  padding: 0 24px;
  @media (min-width: 768px) {
    padding: 0 32px;
  }
}
.layout-flex {
  display: flex;
}
.notes-home .title {
  font-size: 18px;
  font-weight: 700;
  margin: 18px 0;
}
.content {
  flex: 1 1 auto;
}

.archive-li {
  margin: 8px 0 18px 0;
}

.doc-info {
  display: flex;
  align-items: center;
}
.doc-title {
  font-weight: 600;
}
.dashed-line {
  flex: 1 1 auto;
  border-top: 1px dashed gainsboro;
  margin: 0 8px;
}
.doc-date {
  font-family: monospace;
}
.doc-tags {
  margin: 8px 0;
}
.doc-tag {
  padding: 2px 8px;
  border: 1px solid gainsboro;
  margin: 2px 4px;
  border-radius: 4px;
  font-size: 12px;
}
.doc-desc {
  color: #86909c;
  font-size: 13px;
}
.aside {
  margin-left: 24px;
  width: 360px;
  flex: 0 0 auto;
}

.tags, .categories {
  margin: 16px 0 32px;
}

.tag, .category {
  display: inline-block;
  max-width: 100px;
  word-break: break-all;
  background-color: white;
  font-size: 14px;
  border-radius: 11px;
  padding: 4px 8px;
  margin: 2px;
  line-height: 18px;
  color: #333333;
  cursor: pointer;
}
.tag.active, .category.active {
  background-color: coral;
  color: white;
}
</style>