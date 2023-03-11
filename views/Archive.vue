<template>
  <div class="notes-home">
    <ul class="archive-ul">
      <li class="archive-li" v-for="(item, index) in data" :key="index">
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

    <div class="aside">
      <div>
        <span v-for="(v, k) in tagsAndCategories.tags" :key="tags">{{ k }}({{ v }})</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getDateStr } from "../utils/getDateStr.mjs";

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
    sortBy: SORT.LAST_UPDATED
  }),
  props: {
    source: Array
  },
  computed: {
    data() {
      return this.source.map(({file, data, lastUpdated}) => {
        const match = /\/docs((?:\/\w+)*(?:\/(\w+)\/index|(?!\/index\.md$)\/(\w+)))\.md$/.exec(file);
        const { title, tags, categories, description, created, updated } = data;
        return {
          file,
          title: title || match[2] || match[3],
          tags,
          categories,
          description,
          created: created && getDateStr(created),
          updated: updated && getDateStr(updated),
          updatedByGit: lastUpdated && getDateStr(lastUpdated),
          lastUpdated,
          href: match[1] + '.html'
        }
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
  }
}
</script>

<style>
.notes-home {
  max-width: calc(var(--vp-layout-max-width) - 64px);
  margin: 0 auto;
  display: flex;
}
.archive-ul {
  padding: 0 24px;
  flex: 1 1 auto;
}
@media (min-width: 768px) {
  .archive-ul {
      padding: 0 32px;
  }
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
</style>