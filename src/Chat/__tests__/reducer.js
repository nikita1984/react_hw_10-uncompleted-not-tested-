/*
it("returns state with status loading after requestArticles action",
() => {
const expected = {
articles: [],
request: {
    status: REQUEST_STATUS.LOADING,
    error: null,
},
};
const received = reducer(undefined, getArticlesRequest());
expect(received).toEqual(expected);
});
*/