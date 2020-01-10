import Axios from "axios";

const RepositoryStore = {
  namespaced: true,
  state: {
    repository: null,
    commits: null,
    active: null,
    tree: null,
    path: null,
    inspecting: null
  },
  mutations: {
    SET_REPOSITORY(state, payload) {
      state.repository = payload;
    },
    SET_COMMITS(state, payload) {
      state.commits = payload;
    },
    SET_ACTIVE(state, payload) {
      state.active = payload;
    },
    SET_TREE(state, payload) {
      state.tree = payload;
    },
    SET_PATH(state, payload) {
      state.path = payload;
    },
    SET_INSPECTING(state, payload) {
      state.inspecting = payload;
    },
    CLEAR(state) {
      state.repository = null;
      state.commit = null;
      state.active = null;
      state.tree = null;
      state.path = null;
      state.inspecting = null;
    }
  },
  actions: {
    async getRepository({ commit }, repo) {
      try {
        const response = await Axios.get(
          `https://api.github.com/repos/${repo}`
        );

        if (response && response.data) {
          commit("SET_REPOSITORY", response.data);

          const commits = await Axios.get(
            `https://api.github.com/repos/${repo}/commits`
          );

          if (commits && commits.data && commits.data.length > 0) {
            commit("SET_COMMITS", commits.data);

            const latest = commits.data[0];
            commit("SET_ACTIVE", latest.sha);

            const tree = await Axios.get(latest.commit.tree.url);
            commit("SET_TREE", [
              ...tree.data.tree.filter(item => item.type == "tree"),
              ...tree.data.tree.filter(item => item.type == "blob")
            ]);
          }

          return response.data;
        } else {
          return false;
        }
      } catch (err) {
        return false;
      }
    },

    async getTreeContent({ state, commit }, treeRef) {
      const hasChild = state.tree.find(item => item.parent == treeRef.sha);
      if (hasChild) {
        const newPath = treeRef.sha;
        commit("SET_PATH", newPath);
      } else {
        try {
          const tree = await Axios.get(treeRef.url);
          const childTree = tree.data.tree.map(item => {
            item.parent = treeRef.sha;
            return item;
          });

          const nestTree = [...state.tree, ...childTree];

          commit("SET_TREE", nestTree);
          const newPath = treeRef.sha;

          commit("SET_PATH", newPath);
        } catch (err) {
          return false;
        }
      }
    },

    async getBlobContent({ commit }, blobRef) {
      try {
        const blob = await Axios.get(blobRef.url);
        var decodedData = window.atob(blob.data.content);
        commit("SET_INSPECTING", {
          ...blobRef,
          ...blob.data,
          content: decodedData
        });
        return decodedData;
      } catch (err) {
        return false;
      }
    }
  }
};

export default RepositoryStore;
