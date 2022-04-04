import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { Search, TableHeading, TablePagination } from '../components/datatable';
import LoadingSpinner from '../components/LoadingSpinner';
import { DataHeader, Photo } from '../types/data';

const DataTablePage = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sorting, setSorting] = useState({ field: '', order: '' });

  const ITEMS_PER_PAGE = 50;

  const headers: DataHeader[] = [
    { name: 'No', field: 'id', sortable: false },
    { name: 'Title', field: 'title', sortable: true },
    { name: 'Url', field: 'url', sortable: false },
    { name: 'Thumbnail', field: 'thumbnailUrl', sortable: false },
  ];

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const res = await axios.get(
        'https://jsonplaceholder.typicode.com/photos'
      );
      setLoading(false);
      setPhotos(res.data);
    };
    getData().catch((err) => console.error(err));
  }, []);

  const photoData = useMemo(() => {
    let computedPhotos = photos;

    if (search) {
      computedPhotos = computedPhotos.filter(({ title }) =>
        title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setTotalItems(computedPhotos.length);

    if (sorting.field) {
      const reversed = sorting.order === 'asc' ? 1 : -1;
      computedPhotos = computedPhotos.sort(
        (a, b) =>
          reversed *
          (a as any)[sorting.field].localeCompare((b as any)[sorting.field])
      );
    }

    return computedPhotos.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [photos, currentPage, search, sorting]);

  const renderDataTable = () => (
    <div className="row w-100">
      <div className="col mb-3 col-12">
        <div className="row">
          <div className="col-md-6">
            <TablePagination
              total={totalItems}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
          <div className="col-md-6 d-flex flex-row-reverse">
            <Search
              onSearch={(value) => {
                setSearch(value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
        <table>
          <TableHeading
            headers={headers}
            onSorting={(field, order) => setSorting({ field, order })}
          />
          <tbody>
            {photoData.map(({ id, title, url, thumbnailUrl }) => (
              <tr>
                <th scope="row" key={id}>
                  {id}
                </th>
                <td>{title}</td>
                <td>{url}</td>
                <td>{thumbnailUrl}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <>
      <h5>Data Table</h5>
      {loading ? <LoadingSpinner /> : renderDataTable()}
    </>
  );
};

export default DataTablePage;
