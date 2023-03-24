<template>
  <div class="notes-home">
    <h2 class="title">笔记·最近编辑</h2>
    <div class="layout-flex">
      <div class="content">
        <ul class="archive-ul">
          <li class="archive-li" :class="{draft: item.draft}" v-for="(item, index) in list" :key="index">
            <a class="archive-doc" :href="item.href">
              <div class="doc-info">
                <span class="doc-title">{{ item.title }}</span>
                <span class="dashed-line"></span>
                <span class="doc-date">{{ item.updatedStr }}</span>
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
        <div class="aside-title">categories</div>
        <div class="categories">
          <span
            class="category"
            :class="{active: selectedCategories.includes(k)}" v-for="(v, k) in tagsAndCategories.categories"
            :key="k"
            @click="() => handleTagOrCategoryClick('category', k)"
          >{{ k }}({{ v }})</span>
        </div>

        <div class="aside-title">tags</div>
        <div class="tags">
          <span
            class="tag"
            :class="{active: selectedTags.includes(k)}" v-for="(v, k) in tagsAndCategories.tags"
            :key="k"
            @click="() => handleTagOrCategoryClick('tag', k)"
          >{{ k }}({{ v }})</span>
        </div>

        <div class="search">
          <input class="input-search" type="text" v-model="search.title" placeholder="输入笔记标题进行搜索">
        </div>
        <div class="actions">
          <button @click="reset" class="a-btn-reset">重置</button>
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
}

export default {
  setup () {
    return {}
  },
  data: () => ({
    sortBy: SORT.UPDATED,
    selectedTags: [],
    selectedCategories: [],
    search: {
      title: ''
    }
  }),
  props: {
    source: Array
  },
  computed: {
    data() {
      return this.source.map(({file, data, gitTimestamp}) => {
        console.log(file);
        const { title: titleByMatch, isIndex, url } = matchFilePath(file);
        const { title, tags, categories, description, created, updated, draft } = data;
        return {
          draft,
          file,
          title: (title || (isIndex ? titleByMatch + '/index' : titleByMatch)) + (draft ? '(draft)' : ''),
          tags,
          categories,
          description,
          created,
          updated,
          gitTimestamp,
          createdStr: getDateStr(created || gitTimestamp),
          updatedStr: getDateStr(updated || gitTimestamp),
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
        return (filter[0] === true && filter[1] === true) && (this.search.title ? item.title.includes(this.search.title) : true);
      }).sort((a, b) => {
        switch (this.sortBy) {
          case SORT.TITLE: break;
          case SORT.CREATED: return (b.created || b.gitTimestamp) - (a.created || a.gitTimestamp);
          case SORT.UPDATED: return (b.updated || b.gitTimestamp) - (a.updated || a.gitTimestamp);
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
          if (item[key]?.length) {
            (item[key] || []).forEach(v => {
              if (data[key][v]) {
                data[key][v]++;
              } else {
                data[key][v] = 1;
              }
            })
          } else {

          }
          
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
    },
    reset() {
      this.search.title = '';
      this.selectedTags = [];
      this.selectedCategories = [];
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
  color: var(--vp-c-brand);
}

.archive-li.draft {
  color: var(--vp-c-brand-darker);
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
  /* max-width: 100px; */
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
  background-color: var(--vp-c-brand);
  color: white;
}

.search {
  margin: 16px 0;
}
.input-search {
  border: 1px solid var(--vp-input-border-color);
  background-color: var(--vp-input-bg-color);
  padding: 4px 8px;
  border-radius: 4px;
  width: 100%;
}
.input-search:hover, .input-search:focus, .input-search:active {
  border-color: var(--vp-input-hover-border-color);
}

.actions {
  margin: 16px 0;
  text-align: right;
}
.a-btn-reset {
  padding: 4px 12px;
  border-radius: 4px;
  border: 1px solid var(--vp-button-brand-border);
  background-color: var(--vp-button-brand-bg);
  color: var(--vp-button-brand-text);
}
.a-btn-reset:hover {
  border-color: var(--vp-button-brand-hover-border);
  color: var(--vp-button-brand-hover-text);
  background-color: var(--vp-button-brand-hover-bg);
}
.a-btn-reset:active {
  border-color: var(--vp-button-brand-active-border);
  color: var(--vp-button-brand-active-text);
  background-color: var(--vp-button-brand-active-bg);
}
</style>