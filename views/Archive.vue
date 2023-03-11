<template>
  <ul class="archive-ul">
    <li class="archive-li" v-for="(item, index) in data" :key="index">
      <a class="archive-doc" :href="item.href">
        <div class="doc-info">
          <span class="doc-title">{{ item.title }}</span>
          <span class="dashed-line"></span>
          <span class="doc-date">{{ item.updatedByGit }}</span>
        </div>
      </a>
    </li>
  </ul>
</template>

<script>
const SORT = {
  TITLE: 'TITLE',
  CREATED: 'CREATED',
  UPDATED: 'UPDATED',
  LAST_UPDATED: 'LAST_UPDATED',
}

const formatDateTime = timeStamp => {
  const d = new Date(timeStamp);
  return `${d.getFullYear()}-${String(d.getMonth() + 1)}-${String(d.getDate())} ${d.getHours()}:${String(d.getMinutes())}:${String(d.getSeconds())}`
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
          created: created && formatDateTime(created),
          updated: updated && formatDateTime(updated),
          updatedByGit: lastUpdated && formatDateTime(lastUpdated),
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
    }
  }
}
</script>

<style>
.archive-ul {
  padding: 0 24px;
}
@media (min-width: 768px) {
  .archive-ul {
      padding: 0 32px;
  }
}

.archive-li {
  margin: 8px 0;
}

.doc-info {
  display: flex;
  align-items: center;
}
.dashed-line {
  flex: 1 1 auto;
  border-top: 1px dashed gainsboro;
  margin: 0 8px;
}
</style>